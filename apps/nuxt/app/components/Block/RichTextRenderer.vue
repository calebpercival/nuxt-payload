<script setup>
import DynamicComponent from "~/components/DynamicComponent.vue";

/**
 * Props:
 * - content: Lexical SerializedEditorState
 *   Expected shape: { root: { children: [...] } }
 */
const props = defineProps({
  content: { type: Object, required: true },
});

/**
 * Lexical text formatting bitmask flags (common defaults)
 */
const FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
  HIGHLIGHT: 128,
};

const ALIGNMENTS = new Set(["left", "center", "right", "justify"]);

/**
 * Helper: check if a bit-flag is present in the bitmask.
 */
function has(format, flag) {
  return (format & flag) === flag;
}

/**
 * Helper: Block-level attributes (alignment, indent, rtl).
 * - In your data, top-level nodes often have `format: "left|center|right|justify"`.
 * - Text nodes have numeric `format` (handled elsewhere).
 */
function getBlockAttrs(node) {
  const attrs = {};

  // Alignment catch-all
  if (typeof node?.format === "string") {
    const align = node.format.trim();
    if (ALIGNMENTS.has(align)) {
      attrs.style = { ...(attrs.style || {}), textAlign: align };
    }
  }

  // Indentation (optional): Lexical uses an integer indent level
  if (typeof node?.indent === "number" && node.indent > 0) {
    attrs.style = {
      ...(attrs.style || {}),
      marginLeft: `${node.indent * 1.5}rem`,
    };
  }

  // RTL direction (optional)
  if (node?.direction === "rtl") attrs.dir = "rtl";

  return attrs;
}

/**
 * Render a Lexical "text" node.
 * - node.format is a *number* bitmask for inline formatting.
 * - node.style is a CSS string (usually empty), apply if present.
 */
function renderTextNode(node) {
  let out = node.text ?? "";

  const format = typeof node.format === "number" ? node.format : 0;

  // Wrap the text in tags based on enabled format bits.
  // Order chosen for stable output.
  if (has(format, FORMAT.CODE)) out = h("code", null, out);
  if (has(format, FORMAT.UNDERLINE)) out = h("u", null, out);
  if (has(format, FORMAT.STRIKETHROUGH)) out = h("s", null, out);
  if (has(format, FORMAT.ITALIC)) out = h("em", null, out);
  if (has(format, FORMAT.BOLD)) out = h("strong", null, out);
  if (has(format, FORMAT.SUBSCRIPT)) out = h("sub", null, out);
  if (has(format, FORMAT.SUPERSCRIPT)) out = h("sup", null, out);
  if (has(format, FORMAT.HIGHLIGHT)) out = h("mark", null, out);

  // Build inline styles from both node.style and node.$ properties
  let inlineStyle =
    node.style && node.style.trim().length > 0 ? node.style : "";

  const props = {};
  // Add color from custom payload if it exists
  if (node.$?.color) {
    const colorStyle = `color: ${node.$.color}`;
    inlineStyle = inlineStyle ? `${inlineStyle}; ${colorStyle}` : colorStyle;
  }

  if (node.$?.textStyle) {
    props.class = node.$.textStyle;
  }

  if (inlineStyle) {
    props.style = inlineStyle;
  }

  if (props.class || props.style) {
    out = h("span", props, out);
  }

  return out;
}

/**
 * Render an array of child nodes (returns array of VNodes/strings).
 */
function renderChildren(children = []) {
  return children.map(renderNode).filter(Boolean);
}

/**
 * Check if a list item node looks like a checklist item.
 * In Lexical checklists, listitem often has `checked: true|false`.
 */
function isChecklistItem(node) {
  return typeof node?.checked === "boolean";
}

/**
 * Render one Lexical node into a VNode/string.
 * Add more cases as your editor uses more features.
 */
function renderNode(node) {
  if (!node || typeof node !== "object") return null;

  switch (node.type) {
    /**
     * Paragraph
     */
    case "paragraph":
      return h("p", getBlockAttrs(node), renderChildren(node.children));

    /**
     * Heading
     * Your data includes: { type: 'heading', tag: 'h2', format: 'left', children: [...] }
     */
    case "heading":
      return h(
        node.tag || "h2",
        getBlockAttrs(node),
        renderChildren(node.children),
      );

    /**
     * Lists
     * listType: 'bullet' | 'number' | 'check' (commonly)
     */
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      // alignment/indent rarely matter on lists but safe to apply
      return h(tag, getBlockAttrs(node), renderChildren(node.children));
    }

    /**
     * List item
     * If checklist, show a disabled checkbox
     */
    case "listitem": {
      if (isChecklistItem(node)) {
        return h(
          "li",
          {
            class: [
              "rt-checkitem",
              node.checked ? "is-checked" : "is-unchecked",
            ],
          },
          [
            h("input", {
              type: "checkbox",
              checked: node.checked,
              disabled: true,
            }),
            h("span", null, renderChildren(node.children)),
          ],
        );
      }
      return h("li", getBlockAttrs(node), renderChildren(node.children));
    }

    /**
     * Block quote
     */
    case "quote":
    case "blockquote":
      return h(
        "blockquote",
        getBlockAttrs(node),
        renderChildren(node.children),
      );

    /**
     * Horizontal rule
     */
    case "horizontalrule":
    case "hr":
      return h("hr");

    /**
     * Link
     * Shape varies; support common fields.
     */
    case "autolink":
      return h("span", {}, renderChildren(node.children));

    case "link":
      const url =
        node.fields?.linkType === "custom"
          ? node.fields?.url || "#"
          : getContentPath(
              node.fields?.doc?.relationTo,
              node.fields?.doc?.value?.slug,
            );
      const newTab = node.newTab === true || node.fields?.newTab === true;

      return h(
        "a",
        {
          href: url,
          target: newTab ? "_blank" : undefined,
          rel: newTab ? "noopener noreferrer" : undefined,
        },
        renderChildren(node.children),
      );

    /**
     * Line break
     */
    case "linebreak":
      return h("br");

    /**
     * Text node
     */
    case "text":
      return renderTextNode(node);

    /*  
    Custom block component nodes
    */
    case "block":
      return node.fields?.blockType
        ? h(DynamicComponent, { data: node.fields })
        : null;

    /* render table */
    case "table":
      return h("table", getBlockAttrs(node), renderChildren(node.children));
    case "tablerow":
      return h("tr", getBlockAttrs(node), renderChildren(node.children));
    case "tablecell":
      return h("td", getBlockAttrs(node), renderChildren(node.children));

    /* inline blocks */

    case "inlineBlock":
      return node.fields?.blockType
        ? h(DynamicComponent, { data: node.fields })
        : null;

    /* image/video upload */
    case "upload":
      if (node.value?.mimeType.includes("image")) {
        return h("img", {
          src: node.value?.url || "",
          alt: node.value?.alt || "",
          style: { maxWidth: "100%", margin: "20px auto" },
        });
      } else if (node.value?.mimeType.includes("video")) {
        return h("video", {
          src: node.value?.url || "",
          alt: node.value?.alt || "",
          style: { maxWidth: "100%" },
        });
      }

    /**
     * Fallback: ignore unknown nodes
     */
    default:
      return null;
  }
}

/**
 * Top-level render: Lexical content is at content.root.children
 */
const rendered = computed(() => {
  const kids = props.content?.root?.children;
  if (!Array.isArray(kids)) return [];
  return kids.map(renderNode).filter(Boolean);
});
</script>

<template>
  <div class="payload-richtext">
    <template v-for="(node, i) in rendered" :key="i">
      <component :is="node" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

.rt-checkitem {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.rt-checkitem input {
  margin-top: 0.2rem;
}

h1,
h2 {
  font-size: 80px;
  @include mobile() {
    font-size: 40px;
  }
  @include tablet() {
    font-size: 50px;
  }
  // word-break: break-all;
  font-weight: medium;
  text-transform: uppercase;
  strong {
    font-weight: bold;
  }
}

h1,
h2,
h3,
h4,
p,
ul,
ol,
.button {
  margin-bottom: 20px;

  max-width: 900px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }
  tr:first-of-type {
    background-color: #f4f4f4;
    color: #1a1a1a;
  }
}
.subheading {
  text-transform: uppercase;
  font-size: 40px;
  line-height: 40px;
  @include mobile() {
    font-size: 24px;
    line-height: 24px;
  }
  letter-spacing: 0px;
  font-weight: 300;
  display: inline-block;
  max-width: 900px;
}

h3 {
  font-size: 26px;
  line-height: 1.1;
  font-weight: 400;
  text-transform: uppercase;
}
</style>
