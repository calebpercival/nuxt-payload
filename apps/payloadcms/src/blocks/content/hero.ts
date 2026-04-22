import { Block } from 'payload'
import { Button } from '@/blocks/content/button'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Heroe Sections',
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
    },
    {
      name: 'text',
      label: 'Text',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'h1Source',
          label: 'H1 Source',
          type: 'select',
          options: [
            {
              label: 'Use title text',
              value: 'title',
            },
            {
              label: 'Custom (hidden for SEO)',
              value: 'custom',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
          defaultValue: 'title',
        },
        {
          name: 'customH1',
          label: 'Custom H1 text (SEO)',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.h1Source === 'custom',
            description: 'Used as a visually hidden H1 for SEO',
          },
        },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'backgroundVideo',
      label: 'Background Video',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      name: 'overlay',
      label: 'Overlay',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
