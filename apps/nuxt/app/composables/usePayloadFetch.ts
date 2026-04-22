export const usePayloadFetch = (
  path: string,
  opts: Record<string, any> = {},
) => {
  const route = useRoute();
  const headers = useRequestHeaders(["cookie"]);
  const config = useRuntimeConfig();
  const isPreview = !!route.query.preview;

  if (isPreview) {
    return $fetch(
      `${config.public.payloadUrl}${config.public.payloadApiRoute}/${path}`,
      { headers, ...opts, query: { ...opts.query, draft: "true" } },
    );
  }

  return $fetch(`/api/payload/${path}`, opts);
};
