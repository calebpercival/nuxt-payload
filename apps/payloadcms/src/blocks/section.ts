import { Block } from 'payload'
import { contentBlocks } from '@/blocks/contentBlocks'

export const Section: Block = {
  slug: 'section',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  fields: [
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [...contentBlocks],
    },
    {
      label: 'Section Config',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'text',
        },
        {
          name: 'textColor',
          label: 'Text Color',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          defaultValue: 'default',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundImage',
              label: 'Background Image',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'tileBackground',
              label: 'Tile Background',
              type: 'checkbox',
            },
            {
              name: 'backgroundFixed',
              label: 'Background fixed on scroll',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'paddingTop', label: 'Padding Top', type: 'number' },
            { name: 'paddingBottom', label: 'Padding Bottom', type: 'number' },
          ],
        },
        {
          type: 'row',

          fields: [
            {
              name: 'topDivider',
              label: 'Top Divider',
              defaultValue: 'none',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Fade', value: 'fade' },
              ],
            },
            {
              name: 'bottomDivider',
              label: 'Bottom Divider',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Fade', value: 'fade' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundDecorationToggle',
              label: 'Toggle Background Decoration',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'backgroundDecoration',
              label: 'Background Decoration',
              type: 'select',
              options: [
                { label: 'Blurred Logo', value: 'blurred-logo' },
                { label: 'Radial Glow', value: 'radial-glow' },
              ],
              admin: {
                condition: (data, siblingData) => siblingData.backgroundDecorationToggle === true,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundDecorationPosition',
              label: 'Decoration Alignment',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                condition: (data, siblingData) => siblingData.backgroundDecorationToggle === true,
              },
            },
            {
              name: 'backgroundDecorationYPosition',
              label: 'Decoration Y Position',
              type: 'select',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
              defaultValue: 'bottom',
              admin: {
                condition: (data, siblingData) => siblingData.backgroundDecorationToggle === true,
              },
            },
          ],
        },
      ],
    },
  ],
}
