import { Section } from '@/blocks/section'
import { slugField, type CollectionConfig } from 'payload'
import { seoFields } from '@/fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({
      useAsSlug: 'title',
    }),
    seoFields(),
    {
      label: 'Content Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      name: 'blocks',
      type: 'blocks',
      blocks: [Section],
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
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
  },
}
