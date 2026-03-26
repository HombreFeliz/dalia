import { defineType, defineField } from 'sanity';

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Sobre el Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta de sección',
      description: 'Ej: "El Proyecto"',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título de sección',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción del proyecto',
      description: 'Párrafo principal describiendo el proyecto DALIA',
      type: 'localeText',
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'Subtítulo (Finalidad y objetivos)',
      type: 'localeString',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Párrafos adicionales',
      description: 'Párrafos explicativos sobre la finalidad del proyecto',
      type: 'array',
      of: [{ type: 'localeText' }],
    }),
    defineField({
      name: 'reference',
      title: 'Referencia del proyecto',
      description: 'Ej: "PID2024-160387NA-I00. Agencia Estatal de Investigación..."',
      type: 'localeString',
    }),
    defineField({
      name: 'objectivesTitle',
      title: 'Título de objetivos',
      type: 'localeString',
    }),
    defineField({
      name: 'objectives',
      title: 'Objetivos específicos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto del objetivo',
              type: 'localeText',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text.es' },
            prepare: ({ title }) => ({
              title: title ? title.substring(0, 80) + '...' : 'Objetivo',
            }),
          },
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Sobre el Proyecto' }),
  },
});
