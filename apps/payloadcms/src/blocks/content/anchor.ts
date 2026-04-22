import { Block } from 'payload'

export const Anchor: Block = {
  slug: 'anchor',
  labels: {
    singular: 'Anchor',
    plural: 'Anchors',
  },
  fields: [
    {
      name: 'id',
      label: 'Anchor ID',
      type: 'text',
      required: true,
      admin: {
        description: 'Used for jump links (e.g., "our-services"). No # symbol needed.',
      },
    },
  ],
}
