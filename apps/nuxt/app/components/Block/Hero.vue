<script setup>
const props = defineProps({
  text: {
    type: Object,
  },
  backgroundImage: {
    type: Object,
  },
  backgroundVideo: {
    type: Object,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: Object,
  },
  buttons: {
    type: Array,
  },
  h1Source: {
    type: String,
    default: "title",
  },
  customH1: {
    type: String,
  },
});

const styles = computed(() => {
  let styleObj = {};

  if (props.backgroundImage) {
    styleObj["background-image"] = `url(${props.backgroundImage?.url})`;
  }

  return styleObj;
});
</script>

<template>
  <div
    class="hero-bg full-width"
    :style="styles"
    :class="[overlay && 'overlay']"
  >
    <div class="content">
      <component :is="customH1 ? 'h1' : 'div'" class="logo-wrapper">
        {{ customH1
        }}<img
          v-if="logo"
          :src="logo.url"
          :alt="logo.alt"
          class="logo"
          width="184px"
          height="184px"
        />
      </component>
      <h1 v-if="h1Source === 'title' && title" class="title">
        <BlockRichTextRenderer :content="text" />
      </h1>
      <span v-else class="title"
        ><BlockRichTextRenderer :content="text"
      /></span>
      <div class="buttons" v-if="buttons">
        <BlockButton v-for="button in buttons" v-bind="button"></BlockButton>
      </div>
    </div>
    <video
      v-if="backgroundVideo"
      autoplay
      loop
      playsinline
      muted
      class="full-width"
    >
      <source :src="backgroundVideo.url" :type="backgroundVideo.mimeType" />
    </video>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/breakpoints.scss" as *;

.hero-bg {
  height: calc(100vh + 100px);
  width: 100vw;
  min-height: 700px;
  max-height: 1200px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  @include mobile() {
    background-attachment: scroll;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
}

.content {
  z-index: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 150px 0;
  flex-direction: column;
  gap: 40px;
}
.logo {
  max-width: 100%;
  @include mobile() {
    max-height: 120px;
    max-width: 120px;
  }
}
.logo-wrapper {
  font-size: 0;
}
.buttons {
  display: flex;
  gap: 0px 40px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.8);
  z-index: 1;
}
</style>
