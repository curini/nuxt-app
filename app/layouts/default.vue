<script setup lang="ts">
useSeoMeta({
  titleTemplate: "%s - API Transport",
  ogTitle: "API Transport",
  description: "Information about traffic.",
  ogDescription: "Information about traffic.",
  ogLocale: "fr_FR",
  twitterCard: "summary_large_image",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
});
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>

<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
