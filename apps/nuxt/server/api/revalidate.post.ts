export default defineEventHandler(async (event) => {
  const { slug, secret } = await readBody(event);
  const config = useRuntimeConfig();

  if (secret !== config.revalidationSecret) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const storage = useStorage("cache");
  const allKeys = await storage.getKeys();
  const matching = allKeys.filter((k) => k.includes(slug));
  await Promise.all(matching.map((k) => storage.removeItem(k)));

  return { ok: true, purged: matching.length };
});
