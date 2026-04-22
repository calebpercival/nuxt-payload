<script setup>
const props = defineProps({
  content: {
    type: Object,
  },
  media: {
    type: Object,
  },
  textPosition: {
    type: String,
    default: "Left",
  },
  verticalPadding: {
    type: String,
    default: "none",
  },
  width: {
    type: String,
    default: "auto",
  },
});

const styles = computed(() => {
  let styleObj = {};

  if (props.textPosition === "Left") {
    styleObj["flex-direction"] = "row";
  } else if (props.textPosition === "Right") {
    styleObj["flex-direction"] = "row-reverse";
  }

  if (props.width && props.width !== "auto") {
    styleObj["max-width"] = props.width;
  }

  return styleObj;
});
</script>

<template>
  <div
    class="contentWithMediaContainer"
    :style="styles"
    :class="[`vertical-margin-${verticalPadding}`]"
  >
    <BlockRichText :content="content" class="richText" />
    <img v-if="media && media.url" :src="media.url" :alt="media.alt" />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

.contentWithMediaContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px 150px;
  margin-left: auto;
  margin-right: auto;
  .richText {
    flex: 1 1 300px;
    max-width: 600px;
  }
  img {
    max-width: 100%;
    width: 50%;
  }
  @include mobile() {
    flex-direction: column-reverse !important;
    .richText {
      flex: unset;
    }
    img {
      width: 100%;
    }
  }
  @include tablet() {
    gap: 20px 40px;
  }
}
</style>
