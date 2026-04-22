import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Texts',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
    {
      label: 'Advanced Settings',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'fontSize',
          label: 'Font Size',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Small', value: 'small' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'extraLarge' },
          ],
          defaultValue: 'default',
        },
        {
          name: 'maxWidth',
          label: 'Max Width',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Small', value: '500px' },
          ],
          defaultValue: 'default',
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
    },
  ],
}
