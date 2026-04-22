import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'lightVariantRequired',
      label: 'Light Variant Required',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'lightIcon',
      label: 'Light Icon',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        condition: (data, siblingData) => siblingData.lightVariantRequired === true,
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
