import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Etiqueta superior',
      description: 'Ej: "Ministerio de Ciencia, Innovación y Universidades · 2025–2028"',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'line1',
      title: 'Línea principal',
      description: 'Subtítulo principal del hero',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'line2',
      title: 'Línea secundaria',
      description: 'Segunda línea descriptiva',
      type: 'localeString',
    }),
    defineField({
      name: 'cta1',
      title: 'Botón primario (CTA 1)',
      type: 'localeString',
    }),
    defineField({
      name: 'cta2',
      title: 'Botón secundario (CTA 2)',
      type: 'localeString',
    }),
    defineField({
      name: 'meta',
      title: 'Meta info',
      description: 'Texto debajo del logo (ej: "IIIA-CSIC · Barcelona")',
      type: 'localeString',
    }),
    defineField({
      name: 'logo',
      title: 'Logo del hero',
      description: 'Imagen principal del hero (logo DALIA)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero' }),
  },
});
