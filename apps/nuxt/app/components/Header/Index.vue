<script setup>
const { data } = useAsyncData(`headerData`, () =>
  $fetch(
    `${useRuntimeConfig().public.payloadUrl}${useRuntimeConfig().public.payloadApiRoute}/globals/header`,
  ),
);

const router = useRouter();
const navRef = ref(null);
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

router.afterEach(() => {
  menuOpen.value = false;
});
</script>

<template>
  <header>
    <div class="header-content">
      <nav>
        <NuxtLink to="/" class="logo-link" @click="menuOpen = false">
          <img
            v-if="data?.logo"
            :src="data.logo.url"
            :alt="data.logo.alt"
            class="logo"
            width="152px"
            height="28px"
          />
        </NuxtLink>

        <button
          class="hamburger"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-menu" :class="{ open: menuOpen }">
          <div class="menu-content">
            <ul ref="navRef">
              <li v-for="link in data?.navigationLinks" :key="link.linkText">
                <NuxtLink v-bind="resolveLinkField(link.linkField)">
                  {{ link.linkText }}
                </NuxtLink>
              </li>
            </ul>
            <BlockButton :linkField="data?.callToAction.linkField">
              {{ data?.callToAction.linkText }}
            </BlockButton>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

</style>
