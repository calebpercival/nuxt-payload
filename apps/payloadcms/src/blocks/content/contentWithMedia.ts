import { Block } from 'payload'

export const ContentWithMedia: Block = {
  slug: 'ContentWithMedia',
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Media',
    },
    {
      name: 'textPosition',
      type: 'radio',
      options: ['Left', 'Right'],
      required: true,
      defaultValue: 'Left',
    },
    {
      name: 'layout',
      label: 'Layout / Split',
      type: 'radio',
      required: true,
      defaultValue: '50-50',
      options: [
        { label: '50 / 50', value: '50-50' },
        { label: '40 / 60', value: '40-60' },
        { label: '33 / 67', value: '33-67' },
        { label: '25 / 75', value: '25-75' },
      ],
      admin: {
        description: 'Controls relative width of text vs media.',
      },
      hidden: true, //hidden due to not currently being utilised on the frontend
    },
    {
      name: 'width',
      label: 'Block Width',
      type: 'select',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Small (750px)', value: 'small' },
      ],
    },
    {
      name: 'verticalPadding',
      label: 'Vertical Padding',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'none',
    },
  ],
}
