import type { Field } from 'payload'

export const seoFields = (): Field => ({
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      label: 'Meta Title',
      type: 'text',
      admin: {
        description: 'Shown in search results and browser tabs.',
      },
    },
    {
      name: 'description',
      label: 'Meta Description',
      type: 'textarea',
      admin: {
        description: 'Short summary shown in search results.',
        rows: 4,
      },
    },
    {
      name: 'image',
      label: 'Social Image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Used for link previews (Open Graph). Recommended 1200×630.',
      },
    },
  ],
})
