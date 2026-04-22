import { slugField, type CollectionConfig } from 'payload'
import { seoFields } from '@/fields/seo'

type DraftStatusData = {
  _status?: 'draft' | 'published'
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mainPostImage',
      label: 'Main Post image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
    },
    { name: 'content', type: 'richText' },
    {
      name: 'images',
      label: 'Gallery Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'publishedOn',
      type: 'date',
      label: 'Published On Date',
      required: false, // don't hard-require it globally
      index: true,
      admin: {
        position: 'sidebar',
      },
      validate: (value, { data }) => {
        const typedData = data as DraftStatusData
        // Only require it when the doc is being published
        if (typedData?._status === 'published' && !value) {
          return 'Published date is required when publishing.'
        }
        return true
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            const typedData = data as DraftStatusData
            // If publishing and it's empty, set it automatically
            if (typedData?._status === 'published' && !value) {
              return new Date()
            }
            // Otherwise leave whatever the editor set (including backdated)
            return value
          },
        ],
      },
    },
    seoFields(),
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
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
  },
}
