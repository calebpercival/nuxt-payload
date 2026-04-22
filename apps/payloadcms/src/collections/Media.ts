import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',

    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },

    imageSizes: [
      {
        name: 'sm',
        width: 480,
      },
      {
        name: 'md',
        width: 960,
      },
      {
        name: 'lg',
        width: 1280,
      },
      {
        name: 'xl',
        width: 1920
      }
    ],
  },
}
