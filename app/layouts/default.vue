<template>
  <div
    :class="isDashboardRoute
      ? 'min-h-screen bg-[#0A0C10] text-[var(--text-primary)] flex'
      : 'min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]'"
  >
    <!-- Dashboard shell -->
    <template v-if="isDashboardRoute">
      <Sidebar />
      <div class="flex-1 flex flex-col min-w-0 w-full">
        <Header />
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>
    </template>

    <!-- Auth / other pages -->
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const isDashboardRoute = computed(() => {
  return route.path.includes('/dashboard') || String(route.name ?? '').includes('dashboard')
})
</script>