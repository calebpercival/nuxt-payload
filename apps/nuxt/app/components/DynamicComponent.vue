<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const toPascalCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join("");

const computedName = "Block" + toPascalCase(props.data.blockType);
</script>

<template>
  <component class="dynamic-component" :is="computedName" v-bind="data"
    ><slot></slot
  ></component>
</template>

<style scoped lang="scss"></style>
