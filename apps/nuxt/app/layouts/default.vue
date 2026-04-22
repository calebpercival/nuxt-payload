

<template>
  <div class="page-wrapper">
    <!-- <CookieConsent></CookieConsent> -->
    <Header></Header>
    <main class="breakout-grid">
      <slot></slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
main {
  flex-grow: 1;
  overflow: hidden;
  &.breakout-grid {
    place-items: start;
  }
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
