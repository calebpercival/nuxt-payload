export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const path = getRouterParam(event, "path");
    const query = getQuery(event);

    return await $fetch(
      `${config.public.payloadUrl}${config.public.payloadApiRoute}/${path}`,
      {
        query,
      },
    );
  },
  {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    name: "payload",
    getKey: (event) => {
      const path = getRouterParam(event, "path");
      const query = getQuery(event);
      const queryStr = new URLSearchParams(
        query as Record<string, string>,
      ).toString();
      return `${path}:${queryStr || "default"}`;
    },
  },
);
