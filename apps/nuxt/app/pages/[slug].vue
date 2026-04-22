<script setup>
const route = useRoute();

const slug = ref();

slug.value = route.params.slug;
if (slug.value === "home" || slug.value === undefined) {
  navigateTo("/", { redirectCode: 301 });
}

const {
  data: pageData,
  status,
  error,
} = await useAsyncData(`pageData-${slug.value}`, () =>
  usePayloadFetch(`pages?where[slug][equals]=${slug.value}`),
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
    <DynamicComponent
      v-for="(section, sectionIndex) in data.blocks"
      :key="`section-${sectionIndex}-${slug}-${section.id}`"
      :data="section"
      class="full-width"
    >
      <DynamicComponent
        v-for="(component, componentIndex) in section.blocks"
        :key="`component-${sectionIndex}-${componentIndex}-${slug}-${component.id}`"
        :data="component"
      ></DynamicComponent>
    </DynamicComponent>
  </div>
</template>
