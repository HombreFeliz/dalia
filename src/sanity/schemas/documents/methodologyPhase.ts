import { defineType, defineField } from 'sanity';

export const methodologyPhase = defineType({
  name: 'methodologyPhase',
  title: 'Fase de metodología',
  type: 'document',
  fields: [
    defineField({
      name: 'phaseNumber',
      title: 'Número de fase',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      description: 'Admite HTML para saltos de línea (ej: "Proceso<br />participativo")',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      description: 'Se muestra en la tarjeta del timeline en la home',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'Identificador para la URL. Ej: "entrevistas"',
      type: 'slug',
      options: { source: 'title.es', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slugEn',
      title: 'Slug en inglés',
      description: 'Identificador para la URL en inglés. Ej: "interviews"',
      type: 'slug',
      options: { maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenido de la página',
      description: 'Contenido completo que aparece en la página de detalle de la fase',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen (texto plano)',
      description: 'Resumen de la fase para la página de detalle (texto actual)',
      type: 'localeText',
    }),
  ],
  orderings: [
    {
      title: 'Por número de fase',
      name: 'phaseAsc',
      by: [{ field: 'phaseNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      phaseNumber: 'phaseNumber',
      title: 'title.es',
    },
    prepare: ({ phaseNumber, title }) => ({
      title: `Fase ${phaseNumber}: ${title}`,
    }),
  },
});
