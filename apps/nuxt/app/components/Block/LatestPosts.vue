<script setup>
const props = defineProps({
  showAllPosts: {
    type: Boolean,
    default: false,
  },
  numberOfPosts: {
    type: Number,
    default: null,
  },
  categoryFilter: {
    type: Object,
    default: null,
  },
});

const { data, status, error } = await useAsyncData(() =>
  $fetch(
    `${useRuntimeConfig().public.payloadUrl}${useRuntimeConfig().public.payloadApiRoute}/posts?sort=-publishedOn&depth=2&select[title]=true&select[slug]=true&select[mainPostImage]=true&select[category]=true&select[publishedOn]=true&limit=${props.showAllPosts ? "999" : props.numberOfPosts}${props.categoryFilter ? `&where[category][equals]=${props.categoryFilter.id}` : ""}`,
  ),
);
</script>
<template>
  <div class="latest-post-grid">
    <NuxtLink
      class="post-card"
      v-for="(post, index) in data?.docs"
      :key="index"
      :to="`/news/${post.slug}`"
    >
      <img
        v-if="post.mainPostImage"
        :src="post.mainPostImage?.sizes.sm.url || post.mainPostImage?.url"
        :alt="post.mainPostImage?.alt"
        class="post-card-image"
      />
      <!-- <NuxtTime :datetime="post.publishedOn" class="published-date"></NuxtTime> -->
      <div class="post-title">{{ post.title }}</div>
      <div class="post-description">
      </div>
      <div class="read-more">Read More</div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

.latest-post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  place-items: center;
  margin: 20px 0;
}

.post-card {
  width: 100%;
  max-width: 430px;
}

.post-card-image {
}

.post-title {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-transform: uppercase;
}

.post-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 10px 0;
  flex: 1;
}

.read-more {
}

@include mobile() {
  .latest-post-grid {
    grid-template-columns: 1fr;
  }

  .post-title {
    -webkit-line-clamp: 6;
  }
}
</style>
