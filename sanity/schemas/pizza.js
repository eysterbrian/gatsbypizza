import { MdLocalPizza } from 'react-icons/md';

export default {
  // API name
  name: 'pizza',

  // UI/display name
  title: 'Pizzas',
  type: 'document',
  icon: MdLocalPizza,

  // The actual fields in this data type
  fields: [
    {
      name: 'name', // API id
      title: 'Pizza name', // display name
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'image', // API id
      title: 'Image of the Pizza', // display name
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price', // API id
      title: 'Price', // display name
      type: 'number',
      description: 'Price of the pizza in cents',
      // Don't let anyone add an unreasonable cheap pizza...
      validation: (Rule) => Rule.required().min(5000).precision(0).positive(),
      // TODO: Add custom input component in Sanity Studio
    },
    {
      name: 'slug', // API id
      title: 'Slug', // display name
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
  ],
};
