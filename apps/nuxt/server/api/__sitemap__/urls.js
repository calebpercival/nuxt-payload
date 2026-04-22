// server/api/__sitemap__/urls.ts

export default defineSitemapEventHandler(async () => {
  let dynamicUrls = [];

  const config = useRuntimeConfig();

  const siteUrl = config.siteUrl || "http://localhost:3000";

  let allPages = await $fetch(
    `${config.public.payloadUrl}/${config.public.payloadApiRoute}/pages?limit=99`
  );
  let allPosts = await $fetch(
    `${config.public.payloadUrl}/${config.public.payloadApiRoute}/posts?limit=99`
  );

  for (const page of allPages.docs) {
    if (["home", "news"].includes(page.slug)) continue;
    dynamicUrls.push({
      loc: page.slug === "home" ? "/" : `${siteUrl}/${page.slug}`,
      _sitemap: "pages",
    });
  }

  for (const post of allPosts.docs) {
    dynamicUrls.push({
      loc: `${siteUrl}/news/${post.slug}`,
      _sitemap: "pages",
    });
  }

  return dynamicUrls;
});
