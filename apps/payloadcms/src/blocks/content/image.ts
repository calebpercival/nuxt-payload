import { Block } from 'payload'

export const Image: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
      required: true,
    },
    {
      name: 'imageShape',
      label: 'Image Shape',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Variant 1', value: 'variant1' },
        { label: 'Variant 2', value: 'variant2' },
        { label: 'Variant 3', value: 'variant3' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'aspectRatio',
      label: 'Aspect Ratio',
      type: 'select',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: '1:1 (Square)', value: '1/1' },
        { label: '4:3', value: '4/3' },
        { label: '16:9', value: '16/9' },
        { label: '3:4', value: '3/4' },
        { label: '9:16', value: '9/16' },
      ],
      defaultValue: 'auto',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'maxWidth',
          label: 'Max Width',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Full Width', value: 'fullWidth' },
            { label: 'Custom', value: 'custom' },
          ],
          defaultValue: 'default',
        },
        {
          name: 'customMaxWidth',
          label: 'Max Width (px)',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData.maxWidth === 'custom',
            step: 10,
          },
          min: 0,
        },
      ],
    },
  ],
}
