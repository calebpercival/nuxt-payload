import { Block } from 'payload'
import { LinkField } from '@/fields/link'

export const Button: Block = {
  slug: 'button',
  labels: {
    singular: 'Button',
    plural: 'Buttons',
  },
  fields: [
    {
      name: 'text',
      label: 'Button Text',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Button Image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
    },
    {
      name: 'buttonStyle',
      label: 'Button Style',
      type: 'select',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
      ],
      defaultValue: 'solid',
      required: true,
    },
    LinkField,
    {
      name: 'alignment',
      label: 'Button Alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
