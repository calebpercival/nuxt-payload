<script setup>
const route = useRoute();

const slug = ref();

slug.value = route.params.slug;

const {
  data: pageData,
  status,
  error,
} = await useAsyncData(`pageData-news-${slug.value}`, () =>
  usePayloadFetch(`posts?where[slug][equals]=${slug.value}`),
);

const initialDoc = computed(() => pageData.value?.docs?.[0]);

const { data } = useLivePreview({
  initialData: initialDoc,
  depth: 2,
});

if ((status.value !== "pending" && !data.value) || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `The page you are looking for doesn't exist.`,
    fatal: false,
  });
}

useSeoMeta({
  title: () => data.value?.seo?.title,
  ogTitle: () => data.value?.seo?.title,
  description: () => data.value?.seo?.description,
  ogDescription: () => data.value?.seo?.description,
  ogImage: () => data.value?.seo?.image?.url,
  ogImageAlt: () => data.value?.seo?.image?.alt,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="full-width">
    <h1 class="headline">
      {{ data.title }}
    </h1>
    <div class="main-content">
      <BlockRichText
        :content="data.content"
        class="body-content"
      ></BlockRichText>
      <img
        :src="data.mainPostImage.url"
        :alt="data.mainPostImage.alt"
        class="main-image"
      />
    </div>
    <BlockButton
      alignment="left"
      :linkField="{ url: '/news' }"
      class="back-button"
      >Back to news</BlockButton
    >
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/breakpoints.scss" as *;

.headline {
  margin-top: 200px;
  margin-bottom: 20px;
  font-size: 60px;
  font-weight: medium;
  text-transform: uppercase;
}

.main-content {
  margin: 80px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  @include mobile() {
    grid-template-columns: 1fr;
  }
}

.main-image {
  width: 100%;
  grid-row: 1;
  grid-column: 2;
  @include mobile() {
    grid-column: 1;
  }
}
.back-button {
  margin: 80px 0;
}
</style>
