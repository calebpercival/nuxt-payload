import { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'videoURL',
      label: 'Video URL',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter the URL of the youtube video you want to embed.',
      },
    },
  ],
}
