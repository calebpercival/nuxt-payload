import { Block } from 'payload'

export const LatestPosts: Block = {
  slug: 'LatestPosts',
  labels: {
    singular: 'Latest Posts Block',
    plural: 'Latest Posts Blocks',
  },
  fields: [
    { name: 'showAllPosts', label: 'Show All Posts', type: 'checkbox', defaultValue: false },
    {
      name: 'numberOfPosts',
      label: 'Number of Posts to Display',
      type: 'number',
      required: true,
      defaultValue: 3,
      admin: {
        condition: (data, siblingData) => siblingData.showAllPosts === false,
      },
    },
    {
      name: 'categoryFilter',
      label: 'Category Filter',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        description:
          'Select categories to filter posts. Leave empty to show posts from all categories.',
      },
    },
  ],
}
