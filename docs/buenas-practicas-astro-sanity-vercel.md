# Buenas prácticas: Astro + Sanity CMS + Vercel

Lecciones aprendidas integrando un CMS headless con un generador de sitios estáticos y despliegue automatizado.

---

## 1. Arquitectura general

```
Sanity Studio (CMS) → Sanity API → Astro (SSG) → Vercel (hosting)
       ↓                                              ↑
   Webhook ──────────────────────────────────────── Deploy Hook
```

- **Sanity** almacena y gestiona todo el contenido (textos, imágenes, documentos).
- **Astro** genera HTML estático en tiempo de build, consultando la API de Sanity.
- **Vercel** aloja el sitio y lo reconstruye automáticamente cuando Sanity notifica cambios.

### Por qué SSG y no SSR

Para sitios institucionales o de investigación, SSG (Static Site Generation) es la mejor opción:

| | SSG | SSR |
|---|---|---|
| **Velocidad** | Instantáneo (HTML pre-generado) | Cada petición consulta la API |
| **Coste** | Gratis o casi gratis | Funciones serverless = coste por invocación |
| **Resiliencia** | Funciona aunque Sanity caiga | Si Sanity cae, la web cae |
| **Contenido fresco** | Requiere rebuild (~30-40s) | Inmediato |

**Regla general**: si el contenido cambia pocas veces al día, SSG es suficiente. SSR solo merece la pena si necesitas contenido en tiempo real (e-commerce, dashboards, feeds).

---

## 2. Configuración del cliente Sanity

```typescript
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'tu-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // ← CRÍTICO
});
```

### La trampa del CDN (`useCdn`)

Este es probablemente el error más difícil de diagnosticar en esta integración.

**El problema**: con `useCdn: true`, Sanity devuelve datos cacheados. Cuando un editor publica contenido y el webhook dispara un rebuild en Vercel, el build consulta la API de Sanity... pero la CDN aún sirve la versión anterior. El resultado: **el sitio se reconstruye con datos obsoletos**.

**Síntomas**:
- Los cambios en Sanity no aparecen en la web tras el rebuild
- Los tiempos de build de las páginas son sospechosamente rápidos (~15ms en vez de ~3s)
- No hay errores en los logs — simplemente los datos son viejos

**Solución**: usar `useCdn: false` para builds. En SSG no hay penalización real: las consultas solo se ejecutan una vez en build time, no en cada visita.

**Regla**: `useCdn: true` es para aplicaciones SSR con alto tráfico donde la latencia importa. Para SSG, **siempre `useCdn: false`**.

---

## 3. Esquemas de contenido

### Singletons vs. Colecciones

- **Singletons**: documentos únicos (hero, about, contacto, configuración general). Se crean una vez y solo se editan.
- **Colecciones**: documentos repetibles (miembros del equipo, entidades, publicaciones).

```typescript
// Singleton: _id fija para evitar duplicados
defineType({
  name: 'heroSection',
  type: 'document',
  // ...
})

// En sanity.config.ts: impedir que se creen o borren singletons
document: {
  actions: (input, context) =>
    singletonTypes.has(context.schemaType)
      ? input.filter(({ action }) =>
          action && ['publish', 'discardChanges', 'restore'].includes(action))
      : input,
}
```

### Internacionalización a nivel de campo

En vez de duplicar documentos por idioma, se crean tipos de campo bilingües:

```typescript
// localeString: campo corto bilingüe
defineType({
  name: 'localeString',
  type: 'object',
  fields: [
    { name: 'es', type: 'string', title: 'Español' },
    { name: 'en', type: 'string', title: 'English' },
  ],
})
```

Tres variantes según el contenido:
- `localeString` — textos cortos (títulos, etiquetas)
- `localeText` — textos largos (párrafos, descripciones)
- `localeBlockContent` — texto enriquecido (negritas, cursivas, enlaces)

**Ventaja**: el editor ve ambos idiomas en el mismo formulario, sin cambiar de documento. Reduce errores y facilita la sincronización.

---

## 4. Patrón de fallback

Nunca dependas al 100% de una fuente de datos externa. Si Sanity no está disponible o el contenido aún no se ha cargado, la web debe seguir funcionando.

```typescript
// En el componente Astro
let hero, about, settings;
try {
  const data = await getHomePageData();
  hero = data.hero;
  about = data.about;
  settings = data.settings;
} catch {
  // Sanity no disponible — usamos traducciones estáticas
}

// Helper para resolver el valor
function s(
  sanityValue: { es?: string; en?: string } | null,
  fallbackKey: string,
  lang: string
): string {
  if (sanityValue) {
    return sanityValue[lang] ?? sanityValue.es ?? t(fallbackKey, lang);
  }
  return t(fallbackKey, lang);  // traducciones estáticas
}
```

**Regla**: mantén un archivo de traducciones estáticas (`translations.ts`) como red de seguridad. Sanity es la fuente primaria; las traducciones son el fallback.

---

## 5. Queries GROQ

### Proyecciones explícitas

Siempre especifica qué campos necesitas en vez de traer todo el documento:

```groq
// ❌ Malo: trae todo, incluidos campos internos de Sanity
*[_type == "teamMember"]

// ✅ Bueno: solo lo necesario
*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  role,
  institution,
  "photoUrl": photo.asset->url,
  initials,
  order
}
```

### Resolver referencias en la query

Sanity almacena imágenes como referencias. Resuélvelas directamente en GROQ:

```groq
// Resuelve la URL del asset en la misma query
"logoUrl": logo.asset->url
"photoUrl": photo.asset->url
```

### Carga paralela

Usa `Promise.all` para cargar todas las secciones en paralelo:

```typescript
const [hero, about, team, entities] = await Promise.all([
  getHeroSection(),
  getAboutSection(),
  getTeamMembers(),
  getEntities(),
]);
```

---

## 6. Rebuild automático: Vercel + Sanity Webhooks

### Configuración

1. **Vercel**: crear un Deploy Hook en Settings → Git → Deploy Hooks
   - Genera una URL tipo `https://api.vercel.com/v1/integrations/deploy/...`

2. **Sanity**: crear un Webhook en manage.sanity.io → API → Webhooks
   - URL: la del Deploy Hook de Vercel
   - Triggers: Create, Update, Delete
   - Filter: vacío (cualquier cambio dispara rebuild)

### Flujo

```
Editor publica en Sanity
  → Sanity webhook POST al Deploy Hook de Vercel
    → Vercel clona el repo y ejecuta `astro build`
      → Astro consulta Sanity API (useCdn: false)
        → HTML generado con datos frescos
          → Sitio desplegado (~30-40s total)
```

### Trampas comunes

1. **CDN cache** (ya explicado arriba): `useCdn: false`
2. **Webhook race condition**: el webhook se dispara inmediatamente al publicar. Si Sanity tarda en propagar los datos internamente, el build puede capturar datos a medio actualizar. En la práctica esto es raro, pero si ocurre, un segundo rebuild lo resuelve.
3. **Deploy del Studio vs. deploy del sitio**: son cosas distintas.
   - `npm run sanity:deploy` → despliega el Studio (interfaz de edición). Solo necesario cuando cambian los **esquemas**.
   - El webhook de Vercel → reconstruye el **sitio web**. Se dispara con cambios de **contenido**.

---

## 7. Sanity Studio: buenas prácticas

### Organización del Studio

Agrupa los documentos en el panel de navegación para que los editores no se pierdan:

```typescript
structureTool({
  structure: (S) =>
    S.list().title('Contenido').items([
      S.listItem().title('Inicio').child(
        S.list().title('Secciones de inicio').items([
          S.listItem().title('Hero').child(/* singleton */),
          S.listItem().title('Sobre el proyecto').child(/* singleton */),
          S.listItem().title('Contacto').child(/* singleton */),
        ])
      ),
      S.divider(),
      S.listItem().title('Equipo').child(/* lista filtrada */),
      S.listItem().title('Entidades').child(/* lista filtrada */),
      // ...
    ]),
})
```

### Proteger singletons

Impide que los editores creen duplicados o borren documentos únicos:

```typescript
document: {
  actions: (input, context) =>
    singletonTypes.has(context.schemaType)
      ? input.filter(({ action }) =>
          action && ['publish', 'discardChanges', 'restore'].includes(action))
      : input,
}
```

### Login y acceso

- `npx sanity login` (no `sanity login` directamente — puede no estar en el PATH)
- Los colaboradores acceden al Studio desplegado desde el navegador
- Los permisos se gestionan en manage.sanity.io → Members

---

## 8. Imágenes

### Proporciones y recorte

Define proporciones claras en CSS y deja que el navegador recorte:

```css
.team-photo {
  aspect-ratio: 3/4;    /* Retrato */
  object-fit: cover;     /* Recorta sin deformar */
  width: 100%;
}
```

**Recomendación para editores**: subir fotos de al menos 600×800px para retratos. No importa si son más grandes — CSS se encarga del recorte.

### Image URL builder

Sanity permite transformar imágenes al vuelo (resize, crop, formato):

```typescript
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// Uso: urlFor(photo).width(400).height(533).url()
```

> **Nota**: usa `createImageUrlBuilder` (named import), no el default export que está deprecado.

---

## 9. Carga masiva de contenido

Para no introducir todo manualmente en el Studio, crea un script de seed:

```javascript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'tu-project-id',
  dataset: 'production',
  token: process.env.SANITY_TOKEN, // token con permisos de escritura
  apiVersion: '2024-01-01',
  useCdn: false,
});

// createOrReplace: idempotente, se puede ejecutar varias veces
await client.createOrReplace({
  _id: 'heroSection',
  _type: 'heroSection',
  tag: { es: 'Proyecto de investigación', en: 'Research project' },
  // ...
});
```

**Importante**: usa `createOrReplace` en vez de `create` para que el script sea idempotente (ejecutable múltiples veces sin duplicar datos).

**Seguridad**: nunca commits tokens de API. Úsalos como variables de entorno y revócalos cuando ya no los necesites.

---

## 10. Checklist de integración

- [ ] `useCdn: false` en el cliente Sanity para builds SSG
- [ ] Fallback a traducciones estáticas si Sanity no responde
- [ ] Deploy Hook de Vercel configurado
- [ ] Webhook de Sanity apuntando al Deploy Hook
- [ ] Singletons protegidos contra creación/borrado accidental
- [ ] Campos bilingües (ES/EN) en todos los textos
- [ ] Proyecciones GROQ explícitas (solo campos necesarios)
- [ ] Carga paralela con `Promise.all`
- [ ] Script de seed para contenido inicial
- [ ] README documentando setup, comandos y proceso de deploy
- [ ] Studio desplegado para colaboradores (`npm run sanity:deploy`)
- [ ] Proporciones de imagen definidas en CSS con `aspect-ratio` + `object-fit: cover`

---

## Resumen

La combinación Astro + Sanity + Vercel es potente para sitios institucionales:

1. **Sanity** da a los editores una interfaz amigable para gestionar contenido.
2. **Astro SSG** genera HTML rápido y barato.
3. **Vercel** despliega automáticamente con webhooks.

Los puntos críticos son:
- **`useCdn: false`** para que los builds obtengan datos frescos.
- **Fallbacks** para que la web nunca se quede en blanco.
- **Separar deploy del Studio vs. deploy del sitio** — son procesos distintos con triggers distintos.

Con estas prácticas, el flujo es: el editor cambia contenido en Sanity → la web se actualiza sola en ~30 segundos → sin intervención de desarrollo.
