export default function (linkField) {
  if (!linkField) return;

  let linkObj = { to: null, target: null };

  if (linkField?.linkType === "internal" && linkField?.internalLink) {
    linkObj.to = getContentPath(
      linkField.internalLink.relationTo,
      linkField.internalLink.value.slug,
    );
  } else {
    linkObj.to = linkField?.url;
  }

  if (linkField?.newTab) {
    linkObj.target = "_blank";
  } else {
    linkObj.target = "_self";
  }
  return linkObj;
}
