import { GlobalConfig } from 'payload'
import { LinkField } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Settings',
  fields: [
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer Links',
      fields: [{ name: 'linkText', label: 'Text', type: 'text' }, LinkField],
    },
    {
      name: 'legalText',
      type: 'textarea',
      label: 'Legal Text',
      admin: {
        description: 'Text such as copyright information shown at the bottom of the footer.',
      },
    },
  ],
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      // Logged-in users (admin/editor) can read drafts + published
      if (req.user) return true

      // Public API can only read published docs
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
}
