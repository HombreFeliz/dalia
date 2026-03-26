# DALIA

Web del proyecto DALIA — Datos, Algoritmos e Inteligencia Artificial en Atención Primaria.

Sitio construido con [Astro](https://astro.build) y gestionado con [Sanity CMS](https://www.sanity.io/).

## Requisitos

- Node.js 18+
- Cuenta en [Sanity](https://www.sanity.io/) con acceso al proyecto `ct4976jq`

## Comandos

| Comando                | Acción                                          |
| :--------------------- | :---------------------------------------------- |
| `npm install`          | Instala las dependencias                        |
| `npm run dev`          | Arranca el servidor de desarrollo en `localhost:4321` |
| `npm run build`        | Genera el sitio de producción en `./dist/`      |
| `npm run preview`      | Previsualiza el build en local                  |
| `npm run sanity`       | Arranca Sanity Studio en `localhost:3333`        |
| `npm run sanity:deploy`| Despliega Sanity Studio en `*.sanity.studio`    |

## Sanity CMS

Todo el contenido de la web (textos, imágenes, equipo, entidades, metodología, publicaciones) se gestiona desde Sanity Studio.

### Esquemas de contenido

**Singletons** (documentos únicos):
- `heroSection` — logo, tagline, CTAs
- `aboutSection` — descripción del proyecto, objetivos
- `contactSection` — info de contacto, IP, mapa
- `siteSettings` — navegación, etiquetas de sección, footer, logos

**Colecciones** (múltiples documentos):
- `teamMember` — investigadores/as con foto, rol, institución, ORCID
- `entity` — centros de investigación con logo
- `methodologyPhase` — fases de la investigación
- `publication` — artículos y materiales de divulgación

### Bilingüe (ES/EN)

Todos los campos de texto tienen variantes en español e inglés mediante tipos personalizados (`localeString`, `localeText`, `localeBlockContent`).

### Fallback

Si Sanity no tiene contenido o no está disponible, la web usa automáticamente los textos estáticos de `src/i18n/translations.ts`.

## Deploy automático con Vercel + Sanity Webhook

Para que la web se reconstruya automáticamente cada vez que se publica contenido en Sanity:

### 1. Crear un Deploy Hook en Vercel

1. Ir a [vercel.com](https://vercel.com) → proyecto **dalia-iiia** → **Settings** → **Git** → **Deploy Hooks**
2. Crear un hook con:
   - **Name**: `sanity-cms`
   - **Branch**: `main`
3. Copiar la URL generada (tipo `https://api.vercel.com/v1/integrations/deploy/...`)

### 2. Crear un Webhook en Sanity

1. Ir a [manage.sanity.io](https://manage.sanity.io) → proyecto `ct4976jq` → **API** → **Webhooks**
2. Crear un webhook con:
   - **Name**: `Vercel Deploy`
   - **URL**: pegar la URL del Deploy Hook de Vercel
   - **Trigger on**: **Create**, **Update**, **Delete**
   - **Filter**: dejar vacío (cualquier cambio dispara el rebuild)

Con esto configurado, cada cambio publicado en Sanity Studio dispara un rebuild en Vercel (~30-40s).

## Estructura del proyecto

```
/
├── public/                 # Assets estáticos (favicon, logo)
├── src/
│   ├── components/         # Componentes Astro
│   ├── i18n/               # Traducciones estáticas (fallback)
│   ├── layouts/            # Layouts
│   ├── pages/              # Rutas (ES + EN)
│   ├── sanity/
│   │   ├── client.ts       # Cliente Sanity + helper de imágenes
│   │   ├── queries.ts      # Queries GROQ
│   │   └── schemas/        # Esquemas de contenido
│   └── styles/             # CSS global
├── sanity.config.ts        # Configuración de Sanity Studio
├── sanity.cli.ts           # Configuración CLI de Sanity
└── .env.example            # Variables de entorno (template)
```

## Dar acceso a otros colaboradores

1. Ir a [manage.sanity.io](https://manage.sanity.io) → proyecto `ct4976jq` → **Members** → **Invite members**
2. Asignar rol: **Administrator**, **Editor** o **Viewer**
3. Los colaboradores acceden al Studio desplegado en `*.sanity.studio` con su cuenta de Sanity
