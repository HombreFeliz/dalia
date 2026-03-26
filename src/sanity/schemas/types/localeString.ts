import { defineType } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto localizado',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'string',
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
  ],
});
