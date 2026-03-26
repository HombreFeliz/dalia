import { defineType, defineField } from 'sanity';

export const entity = defineType({
  name: 'entity',
  title: 'Entidad',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la entidad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      description: 'Ej: "Barcelona, Cataluña"',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de participación',
      type: 'string',
      options: {
        list: [
          { title: 'Coordinadora', value: 'coordinator' },
          { title: 'Participante', value: 'participant' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Orden en que aparece en la web',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Orden en la web',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'logo',
    },
  },
});
