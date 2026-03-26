import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

// Singleton document types that should not allow creation/deletion
const singletonTypes = new Set([
  'heroSection',
  'aboutSection',
  'contactSection',
  'siteSettings',
]);

// Singleton actions: only allow publishing
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'dalia',
  title: 'DALIA — Gestión de contenido',
  projectId: 'ct4976jq',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Singletons group
            S.listItem()
              .title('Inicio')
              .child(
                S.list()
                  .title('Secciones de inicio')
                  .items([
                    S.listItem()
                      .title('Hero')
                      .child(S.document().schemaType('heroSection').documentId('heroSection')),
                    S.listItem()
                      .title('Sobre el proyecto')
                      .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
                    S.listItem()
                      .title('Contacto')
                      .child(S.document().schemaType('contactSection').documentId('contactSection')),
                  ]),
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('teamMember').title('Equipo'),
            S.documentTypeListItem('entity').title('Entidades'),
            S.documentTypeListItem('methodologyPhase').title('Fases de metodología'),
            S.documentTypeListItem('publication').title('Publicaciones'),
            S.divider(),
            // Site settings
            S.listItem()
              .title('Configuración del sitio')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Prevent new document creation for singletons
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Limit actions for singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
