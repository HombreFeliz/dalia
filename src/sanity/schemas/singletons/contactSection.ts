import { defineType, defineField } from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta de sección',
      type: 'localeString',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
    }),
    defineField({
      name: 'text',
      title: 'Texto introductorio',
      type: 'localeText',
    }),
    defineField({
      name: 'piName',
      title: 'Nombre de la IP',
      type: 'string',
    }),
    defineField({
      name: 'piLabel',
      title: 'Etiqueta IP',
      description: 'Ej: "Investigadora Principal"',
      type: 'localeString',
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false }),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Etiqueta de correo',
      type: 'localeString',
    }),
    defineField({
      name: 'institutionLabel',
      title: 'Etiqueta de institución',
      type: 'localeString',
    }),
    defineField({
      name: 'institutionValue',
      title: 'Valor de la institución',
      description: 'Nombre y dirección de la institución',
      type: 'localeText',
    }),
    defineField({
      name: 'mapLabel',
      title: 'Etiqueta del mapa',
      type: 'localeString',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL del mapa embebido (Google Maps)',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contacto' }),
  },
});
