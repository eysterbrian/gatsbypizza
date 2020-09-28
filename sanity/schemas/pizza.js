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
      name: 'slug', // API id
      title: 'Slug', // display name
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
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
      validation: (Rule) => Rule.required().min(500).precision(0).positive(),
      // TODO: Add custom input component in Sanity Studio
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topping' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      console.log(toppings);
      return {
        title,
        media,
        subtitle: Object.values(toppings)
          .filter((topping) => topping)
          .join(', '),
      };
    },
  },
};
