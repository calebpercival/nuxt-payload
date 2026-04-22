import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  BlocksFeature,
  defaultColors,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cacheInvalidationPlugin } from './plugins/cacheInvalidation'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Header } from './globals/header'
import { Footer } from './globals/footer'
import { Jobs } from './collections/Jobs'

//import components for use in the editor
import { lexicalContentBlocks } from './blocks/contentBlocks'
import { LineBreak } from './blocks/content/lineBreak'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const base = process.env.SERVER_URL || 'http://localhost:3000'

        // If Payload ever calls this without a collection context, fall back safely
        if (!collectionConfig) return base

        // Use URL() so you don't get double slashes etc.
        const url = new URL(base)

        url.searchParams.append('preview', 'true')

        if (collectionConfig.slug === 'posts') {
          url.pathname = `/news/${data.slug}`
          return url.toString()
        }

        if (collectionConfig.slug === 'pages') {
          // special-case home
          url.pathname = data.slug === 'home' ? `` : `/${data.slug}`
          return url.toString()
        }

        // fallback for any other collection
        url.pathname = `/${data.slug}`
        return url.toString()
      },

      collections: ['pages', 'posts'],
    },
  },
  collections: [Pages, Posts, Jobs, Users, Media, Categories],
  globals: [Header, Footer],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: lexicalContentBlocks, inlineBlocks: [LineBreak] }),
      FixedToolbarFeature(),
      EXPERIMENTAL_TableFeature(),
      TextStateFeature({
        state: {
          // textStyle: {
          //   subheading: {
          //     label: 'Subheading',
          //     css: {
          //       'font-size': '1.25rem',
          //       'text-transform': 'uppercase',
          //       display: 'inline-block',
          //     },
          //   },
          // },
          // color: {
          //   '#ffffff': { label: 'Custom Colour', css: { color: '#ffffff' } },
          // },
        },
      }),
    ],
  }),
  routes: {
    api: '/payload-api',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  sharp,
  plugins: [cacheInvalidationPlugin],
  cors: ['http://localhost:3002', 'http://localhost:3000', process.env.SERVER_URL || ''],
  csrf: ['http://localhost:3002', 'http://localhost:3000', process.env.SERVER_URL || ''],
})
