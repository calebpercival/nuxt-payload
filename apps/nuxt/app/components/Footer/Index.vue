<script setup>
const { data, status, error } = await useAsyncData(`footerData`, () =>
  $fetch(
    `${useRuntimeConfig().public.payloadUrl}${useRuntimeConfig().public.payloadApiRoute}/globals/footer`,
  ),
);
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <img
        v-if="data?.footerLogo"
        :src="data.footerLogo.url"
        :alt="data.footerLogo.alt"
        class="logo"
        width="152px"
        height="28px"
      />
      <nav class="footerNav">
        <ul>
          <li v-for="link in data?.footerLinks">
            <NuxtLink v-bind="resolveLinkField(link.linkField)">{{
              link.linkText
            }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="legal-text">{{ data.legalText }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  padding: 120px 40px;
  background: #101010;
  color: #fff;
}

.footer-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.footerNav {
  text-align: center;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    transition: color ease-in-out 0.3s;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px 40px;
    justify-content: center;
  }
}

.legal-text {
  font-size: 14px;
  text-align: center;
  white-space: pre-wrap;
}
</style>
