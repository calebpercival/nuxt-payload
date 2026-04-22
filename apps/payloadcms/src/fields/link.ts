import type { Field } from 'payload'

export const LinkField: Field = {
  name: 'linkField',
  label: '',
  type: 'group',
  fields: [
    {
      name: 'linkType',
      label: 'Link Type',
      type: 'select',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External', value: 'external' },
      ],
      defaultValue: 'internal',
      required: true,
    },
    {
      name: 'url',
      label: 'Link URL',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData.linkType === 'external',
      },
    },
    {
      name: 'newTab',
      label: 'Open in New Tab',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data, siblingData) => siblingData.linkType === 'external',
      },
    },
    {
      name: 'internalLink',
      label: 'Internal Link',
      type: 'relationship',
      relationTo: ['pages'],
      admin: {
        condition: (data, siblingData) => siblingData.linkType === 'internal',
      },
    },
  ],
}
