import { GiMushroomGills } from 'react-icons/gi';

export default {
  name: 'topping',
  title: 'Pizza Toppings',
  type: 'document',
  icon: GiMushroomGills,
  fields: [
    {
      name: 'name',
      title: 'Pizza Topping',
      type: 'string',
      description: 'What is the name of the topping?',
    },
    {
      name: 'vegetarian',
      type: 'boolean',
      title: 'Vegetarian',
      description: 'Is this topping vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegetarian ? ' (VEG)' : ''}`,
    }),
  },
};
