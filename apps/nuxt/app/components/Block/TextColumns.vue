<script setup>
const props = defineProps({
  columns: {
    type: Array,
  },
});
</script>

<template>
  <div class="text-columns">
    <div class="text-column" v-for="col in columns">
      <BlockRichTextRenderer :content="col.text"></BlockRichTextRenderer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-columns {
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}

.text-column {
  width: 100%;
  max-width: 260px;
}
</style>
