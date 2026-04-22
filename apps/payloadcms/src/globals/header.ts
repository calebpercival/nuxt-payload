import { GlobalConfig } from 'payload'
import { LinkField } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Settings',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'navigationLinks',
      label: 'Navigation Links',
      type: 'array',
      fields: [{ name: 'linkText', label: 'Text', type: 'text' }, LinkField],
    },
    {
      name: 'callToAction',
      label: 'Call to Action Button',
      type: 'group',
      fields: [{ name: 'linkText', label: 'Text', type: 'text' }, LinkField],
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
