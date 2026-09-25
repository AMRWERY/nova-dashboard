<template>
  <div
    :class="isDashboardRoute
      ? 'min-h-screen bg-[#0A0C10] text-[var(--text-primary)] flex'
      : 'min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]'"
  >
    <Sidebar v-if="isDashboardRoute" />
    <div :class="isDashboardRoute ? 'flex-1 flex flex-col min-w-0 w-full' : 'w-full'">
      <Header v-if="isDashboardRoute" />
      <main :class="isDashboardRoute ? 'flex-1 overflow-y-auto' : ''">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const isDashboardRoute = computed(() => {
  return route.path.includes('/dashboard') || String(route.name ?? '').includes('dashboard')
})
</script>