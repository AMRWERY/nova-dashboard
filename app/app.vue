<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()

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