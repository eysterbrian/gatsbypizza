import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'person',
  title: 'SliceMaster',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: "SliceMaster's name",
      type: 'string',
      description: 'What is the person`s first name?',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 64,
      },
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Brief bio of this Slicemaster',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image of the person',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
