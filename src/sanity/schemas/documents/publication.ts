import { defineType, defineField } from 'sanity';

export const publication = defineType({
  name: 'publication',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) => Rule.required().min(2025).max(2030),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Artículo científico', value: 'article' },
          { title: 'Capítulo de libro', value: 'chapter' },
          { title: 'Informe', value: 'report' },
          { title: 'Policy Brief', value: 'policy_brief' },
          { title: 'Divulgación', value: 'outreach' },
          { title: 'Otro', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Autores',
      type: 'string',
      description: 'Lista de autores separados por coma',
    }),
    defineField({
      name: 'journal',
      title: 'Revista / Editorial',
      type: 'string',
    }),
    defineField({
      name: 'abstract',
      title: 'Resumen',
      type: 'localeText',
    }),
    defineField({
      name: 'url',
      title: 'URL del documento',
      type: 'url',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'Archivo PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],
  orderings: [
    {
      title: 'Por año (reciente)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'year',
    },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Sin título',
      subtitle: subtitle ? String(subtitle) : '',
    }),
  },
});
