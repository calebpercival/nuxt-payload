export default function getContentPath(collectionType, slug) {
  let path;

  if (collectionType === "posts") {
    path = `/news/${slug}`;
  } else if (collectionType === "pages") {
    path = `/${slug}`;
    if (slug === "home" || slug === "homepage") {
      path = `/`;
    }
  }

  return path;
}
