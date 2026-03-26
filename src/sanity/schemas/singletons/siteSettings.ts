import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    // Navigation labels
    defineField({
      name: 'navProject',
      title: 'Nav: Proyecto',
      type: 'localeString',
      group: 'navigation',
    }),
    defineField({
      name: 'navEntities',
      title: 'Nav: Entidades',
      type: 'localeString',
      group: 'navigation',
    }),
    defineField({
      name: 'navTeam',
      title: 'Nav: Equipo',
      type: 'localeString',
      group: 'navigation',
    }),
    defineField({
      name: 'navPhases',
      title: 'Nav: Metodología',
      type: 'localeString',
      group: 'navigation',
    }),
    defineField({
      name: 'navPublications',
      title: 'Nav: Publicaciones',
      type: 'localeString',
      group: 'navigation',
    }),
    defineField({
      name: 'navContact',
      title: 'Nav: Contacto',
      type: 'localeString',
      group: 'navigation',
    }),
    // Team section labels
    defineField({
      name: 'teamLabel',
      title: 'Etiqueta sección equipo',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'teamTitle',
      title: 'Título sección equipo',
      description: 'Admite HTML (ej: "Investigadoras<br />e Investigadores")',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'teamCount',
      title: 'Subtítulo equipo',
      description: 'Ej: "12 investigadores · 6 instituciones"',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'piRoleLabel',
      title: 'Etiqueta rol IP',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'researcherFemaleLabel',
      title: 'Etiqueta investigadora',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'researcherMaleLabel',
      title: 'Etiqueta investigador',
      type: 'localeString',
      group: 'team',
    }),
    // Entities section labels
    defineField({
      name: 'entitiesLabel',
      title: 'Etiqueta sección entidades',
      type: 'localeString',
      group: 'entities',
    }),
    defineField({
      name: 'entitiesTitle',
      title: 'Título sección entidades',
      type: 'localeString',
      group: 'entities',
    }),
    defineField({
      name: 'coordinatorLabel',
      title: 'Etiqueta "Coordinadora"',
      type: 'localeString',
      group: 'entities',
    }),
    defineField({
      name: 'participantLabel',
      title: 'Etiqueta "Participante"',
      type: 'localeString',
      group: 'entities',
    }),
    // Methodology section labels
    defineField({
      name: 'phasesLabel',
      title: 'Etiqueta sección metodología',
      type: 'localeString',
      group: 'methodology',
    }),
    defineField({
      name: 'phasesTitle',
      title: 'Título sección metodología',
      type: 'localeString',
      group: 'methodology',
    }),
    defineField({
      name: 'readMoreLabel',
      title: 'Texto "Ver más"',
      type: 'localeString',
      group: 'methodology',
    }),
    defineField({
      name: 'methodologyBackLink',
      title: 'Texto volver a metodología',
      type: 'localeString',
      group: 'methodology',
    }),
    defineField({
      name: 'methodologyPlaceholder',
      title: 'Texto placeholder de metodología',
      type: 'localeText',
      group: 'methodology',
    }),
    // Publications section labels
    defineField({
      name: 'publicationsLabel',
      title: 'Etiqueta sección publicaciones',
      type: 'localeString',
      group: 'publications',
    }),
    defineField({
      name: 'publicationsTitle',
      title: 'Título sección publicaciones',
      type: 'localeString',
      group: 'publications',
    }),
    defineField({
      name: 'publicationsEmpty',
      title: 'Texto cuando no hay publicaciones',
      type: 'localeText',
      group: 'publications',
    }),
    // Footer
    defineField({
      name: 'footerCopy',
      title: 'Copyright del footer',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'footerLogos',
      title: 'Logos del footer',
      description: 'Logos de organizaciones que aparecen en el pie de página',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre de la organización',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
      group: 'footer',
    }),
  ],
  groups: [
    { name: 'navigation', title: 'Navegación' },
    { name: 'team', title: 'Equipo' },
    { name: 'entities', title: 'Entidades' },
    { name: 'methodology', title: 'Metodología' },
    { name: 'publications', title: 'Publicaciones' },
    { name: 'footer', title: 'Footer' },
  ],
  preview: {
    prepare: () => ({ title: 'Configuración del sitio' }),
  },
});
