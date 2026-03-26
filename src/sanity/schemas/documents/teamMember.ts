import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      options: {
        list: [
          { title: 'Investigadora Principal', value: 'pi' },
          { title: 'Investigadora', value: 'researcher_f' },
          { title: 'Investigador', value: 'researcher_m' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institución (abreviatura)',
      description: 'Ej: "IIIA-CSIC", "UB", "UAB", "EASP", "Hospital Olot", "IDIAP-JGol"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'initials',
      title: 'Iniciales',
      description: 'Se muestran como placeholder si no hay foto (ej: "NV")',
      type: 'string',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'orcidUrl',
      title: 'ORCID URL',
      type: 'url',
    }),
    defineField({
      name: 'profileUrl',
      title: 'URL del perfil',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Orden en que aparece en la web (la IP primero)',
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
      subtitle: 'institution',
      media: 'photo',
    },
  },
});
