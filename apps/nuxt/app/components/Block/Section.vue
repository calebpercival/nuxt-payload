<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: Object,
    default: null,
  },
  tileBackground: {
    type: Boolean,
    default: false,
  },
  paddingTop: {
    type: Number,
    default: 0,
  },
  paddingBottom: {
    type: Number,
    default: 0,
  },
  topDivider: {
    type: String,
    default: "none",
  },
  bottomDivider: {
    type: String,
    default: "none",
  },
  textColor: {
    type: String,
    default: "",
  },
  backgroundFixed: {
    type: Boolean,
    default: false,
  },
});

const sectionInnerStyles = computed(() => {
  const styles = {};

  if (props.paddingTop) {
    styles["padding-top"] = `${props.paddingTop}px`;
  }

  if (props.paddingBottom) {
    styles["padding-bottom"] = `${props.paddingBottom}px`;
  }

  return styles;
});

const sectionStyles = computed(() => {
  const styles = {};

  if (props.backgroundColor) {
    styles["background-color"] = props.backgroundColor;
    styles["--section-bg"] = props.backgroundColor;
  }

  if (props.textColor && props.textColor === "light") {
    styles["color"] = "#ffffff";
  } else if (props.textColor && props.textColor === "dark") {
    styles["color"] = "#000000";
  }

  if (props.backgroundImage) {
    styles["background-image"] = `url(${props.backgroundImage.url})`;
    styles["background-size"] = "cover";
    styles["background-position"] = " center";
  }
  if (props.tileBackground) {
    styles["background-repeat"] = "repeat";
    styles["background-size"] = "auto";
  } else {
    styles["background-repeat"] = "no-repeat";
  }

  if (props.backgroundFixed) {
    styles["background-attachment"] = "fixed";
  }

  if (props.topDivider !== "none" && props.bottomDivider !== "none") {
    styles["z-index"] = "3";
  } else if (props.bottomDivider !== "none") {
    styles["z-index"] = "2";
  }

  return styles;
});
</script>

<template>
  <section
    :style="sectionStyles"
    :class="[`top-${topDivider}`, `bottom-${bottomDivider}`]"
  >
    <div class="section-inner full-width" :style="sectionInnerStyles">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/scss/breakpoints.scss" as *;

section {
  position: relative;
  isolation: isolate;
  @include mobile() {
    background-attachment: scroll !important;
  }
}
.section-inner {
  min-height: 300px;
  overflow: hidden;
}

section.top-fade::before,
section.bottom-fade::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 150px;
  pointer-events: none;
  z-index: -2;
  width: 100%;
}

/* Top fade: solid -> transparent (downwards) */
section.top-fade::before {
  content: "";
  position: absolute;
  top: -150px;

  background: linear-gradient(
    to top,
    var(--section-bg, rgba(255, 255, 255, 1)) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

/* Bottom fade: solid -> transparent (upwards) */
section.bottom-fade::after {
  bottom: -150px;
  background: linear-gradient(
    to bottom,
    var(--section-bg, rgba(255, 255, 255, 1)) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

</style>
