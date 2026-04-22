//plugin overides response headers from the payload API so that repsonse is cached on server side but not in disk cache
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event, _response) => {
    if (event.path.startsWith("/api/payload")) {
      setResponseHeader(
        event,
        "Cache-Control",
        "no-store, no-cache, must-revalidate",
      );
    }
  });
});
