import { defineType } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Texto largo localizado',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 4,
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
  ],
});
