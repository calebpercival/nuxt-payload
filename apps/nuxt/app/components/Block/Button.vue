<script setup>
import { NuxtLink } from "#components";

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "",
  },
  buttonStyle: {
    type: String,
    default: "solid",
  },
  alignment: {
    type: String,
    default: "center",
  },
  linkField: {
    type: Object,
    default: null,
  },
  image: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <component
    :is="
      linkField?.url || linkField?.internalLink?.value?.slug ? NuxtLink : 'div'
    "
    v-bind="resolveLinkField(linkField)"
    class="button"
    :class="[
      buttonStyle.toLowerCase(),
      alignment ? `align-${alignment.toLowerCase()}` : '',
    ]"
  >
    <img v-if="image" :src="image.url" :alt="image.alt" style="height: 45px" />
    {{ text }}
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.button {
  margin: 10px 0;
  min-height: 50px;
  padding: 10px 35px;
  display: flex;
  font-size: 20px;
  text-align: center;
  align-items: center;
  letter-spacing: 0px;
  color: #ffffff;
  justify-content: center;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  align-self: center;
  gap: 10px;
}

.align-left {
  justify-self: left;
}

.align-center {
  justify-self: center;
}

.align-right {
  justify-self: right;
}

.solid {
  position: relative;
  border-width: 2px;
  border-style: solid;
  z-index: 0;

}

.outline {
  color: #ffffff;
  border: #ffffff solid 1px;

}
</style>
