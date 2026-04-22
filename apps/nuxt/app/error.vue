<script setup>
const props = defineProps({
  error: {
    type: Object,
  },
});
</script>

<template>
  <NuxtLayout>
    <section class="app-error-section">
      <h1>Error {{ error?.statusCode }}</h1>
      <p>{{ error?.statusMessage }}</p>
      <div
        @click="
          () => {
            clearError({ redirect: '/' });
          }
        "
      >
        <BlockButton to="/"> Go back to homepage </BlockButton>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" >
@use "~/assets/scss/main.scss" as *;

.app-error-section {
  margin: 300px 0;
  h1 {
    font-size: 64px;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 50px;
    font-size: 24px;
  }
}
</style>
