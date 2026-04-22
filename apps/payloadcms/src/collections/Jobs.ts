import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title',
    },
    {
      name: 'department',
      type: 'text',
      label: 'Department',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'salary',
      label: 'Salary',
      type: 'text',
    },
    {
      name: 'level',
      label: 'Level',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link',
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
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
  admin: {
    useAsTitle: 'jobTitle',
  },
}
