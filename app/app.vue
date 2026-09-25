<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <LazyVLocaleSwitchOverlay />
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()
const { isSwitching, hideOverlay } = useLocaleOverlay()
const nuxtApp = useNuxtApp()

// Reactively update <html dir="..." lang="..."> whenever locale changes
const currentLocaleData = computed(() =>
  locales.value.find((l) => l.code === locale.value)
)

useHead({
  htmlAttrs: {
    lang: computed(() => currentLocaleData.value?.language ?? locale.value),
    dir: computed(() => currentLocaleData.value?.dir ?? 'ltr'),
  },
})

// Ensure overlay fades out smoothly whenever page loading finishes
nuxtApp.hook('page:finish', () => {
  if (isSwitching.value) {
    hideOverlay(350)
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>