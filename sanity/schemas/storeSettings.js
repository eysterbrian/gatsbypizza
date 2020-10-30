import { MdStore } from 'react-icons/md';

export default {
  // API name
  name: 'storeSettings',

  // UI/display name
  title: 'Settings',
  type: 'document',
  icon: MdStore,

  // The actual fields in this data type
  fields: [
    {
      name: 'storeName',
      title: 'Store Name',
      description: 'Name of the store',
      type: 'string',
    },
    {
      name: 'slicemaster',
      title: 'SliceMaster currently slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
