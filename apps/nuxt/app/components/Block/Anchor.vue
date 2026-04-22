<script setup>
const props = defineProps({
  id: {
    type: String,
  },
});
</script>

<template>
  <div class="jumplink-anchor" :id="id"></div>
</template>

<style lang="scss" scoped>
.jumplink-anchor {
  position: relative;
  top: -100px;
}
</style>
