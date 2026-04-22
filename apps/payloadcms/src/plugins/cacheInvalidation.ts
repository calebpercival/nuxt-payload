import type { Config, Plugin } from 'payload'

const invalidateCache = async (slug: string) => {
  console.log(`[CacheInvalidation] Attempting to invalidate cache for "${slug}"`)
  const baseUrl = process.env.SERVER_URL
  const secret = process.env.REVALIDATION_SECRET
  if (!baseUrl || !secret) return

  try {
    await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, secret }),
    })
  } catch (e) {
    console.warn(`[CacheInvalidation] Failed for "${slug}":`, e)
  }
}

export const cacheInvalidationPlugin: Plugin = (config: Config): Config => ({
  ...config,
  collections: config.collections?.map((col) => ({
    ...col,
    hooks: {
      ...col.hooks,
      afterChange: [
        ...(col.hooks?.afterChange ?? []),
        async ({ collection }) => invalidateCache(collection.slug),
      ],
      afterDelete: [
        ...(col.hooks?.afterDelete ?? []),
        async ({ collection }) => invalidateCache(collection.slug),
      ],
    },
  })),
  globals: config.globals?.map((global) => ({
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [
        ...(global.hooks?.afterChange ?? []),
        async ({ global }) => invalidateCache(global.slug),
      ],
    },
  })),
})
