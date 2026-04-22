<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  font: {
    type: String,
    required: false,
    default: "default",
  },
  fontSizeOverride: {
    type: Number,
    required: false,
    default: null,
  },
  overrideFontColour: {
    type: String,
    required: false,
    default: null,
  },
  maxWidth: {
    type: String,
    required: false,
  },
  fontSize: {
    type: String,
    required: false,
    default: "default",
  },
  verticalPadding: {
    type: String,
    default: "none",
  },
});

const customStyles = computed(() => {
  let styles = {};

  if (props.maxWidth && props.maxWidth !== "default") {
    styles["max-width"] = props.maxWidth;
  }

  if (props.fontSizeOverride) {
    styles["font-size"] = `${props.fontSizeOverride}px`;
  }

  if (props.overrideFontColour) {
    styles["color"] = props.overrideFontColour;
  }

  if (props.font && props.font !== "default") {
    styles["font-family"] = `"${props.font}"`;
  }

  return styles;
});
</script>

<template>
  <div
    class="richTextContainer"
    :style="customStyles"
    :class="[`richtext-size-${fontSize}`, `vertical-margin-${verticalPadding}`]"
    v-reveal="'fade-up'"
  >
    <BlockRichTextRenderer :content="content" />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

.richTextContainer {
  display: block;
  width: 100%;
  // margin: auto;
  overflow-wrap: break-word;
  word-break: break-word;
}

.richtext-size-extraLarge {
  font-size: 48px;
  @include mobile() {
    font-size: 30px;
  }
}

.richtext-size-small {
  // :deep(h2) {
  //   font-size: 42px;
  //   @include mobile() {
  //     font-size: 26px;
  //   }
  // }
  :deep(p, li, span, a) {
    font-size: 18px;
    line-height: 1.3;
  }
  :deep(p strong) {
    font-weight: 700;
  }
}

.richtext-size-default {
  // :deep(h2) {
  //   font-size: 48px;
  //   @include mobile() {
  //     font-size: 30px;
  //   }
  // }

  :deep(p, li, span, a) {
    font-size: 20px;
    line-height: 1.3;
    @include mobile() {
      font-size: 18px;
    }
  }
  :deep(p strong) {
    font-weight: 700;
    // font-size: 22px;
  }
}

.richtext-size-large {
  // :deep(h2) {
  //   font-size: 48px;
  //   @include mobile() {
  //     font-size: 30px;
  //   }
  // }
  :deep(p, li, span, a) {
    line-height: 1.3;
    font-size: 22px;
    @include mobile() {
      font-size: 20px;
    }
  }
  :deep(p strong) {
    font-weight: 700;
    // font-size: 22px;
  }
}

.vertical-margin-small {
  margin-top: 20px;
  margin-bottom: 20px;
}

.vertical-margin-medium {
  margin-top: 40px;
  margin-bottom: 40px;
}

.vertical-margin-large {
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
