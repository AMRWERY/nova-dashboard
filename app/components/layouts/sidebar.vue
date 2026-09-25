<template>
  <!-- Single root wrapper: display:contents is invisible to flex/grid layout -->
  <div class="contents">

    <!-- Mobile overlay backdrop -->
    <Transition name="overlay">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <!-- Sidebar Panel: fixed overlay on mobile, static column on lg+ -->
    <Transition name="sidebar">
      <aside
        v-show="isOpen || isDesktop"
        class="fixed inset-y-0 start-0 z-40 w-60 h-screen bg-[#0A0C10] border-e border-[var(--border-subtle)] flex flex-col select-none lg:relative lg:shrink-0"
      >
        <!-- Brand / Storefront Header -->
        <div class="h-[60px] px-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <nuxt-link-locale to="/" class="flex items-center gap-2.5 group">
            <span class="w-6 h-6 rounded-md bg-[var(--warning)] grid place-items-center shrink-0 shadow-sm" aria-hidden="true">
              <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#0A0C10]" />
            </span>
            <div class="flex items-center gap-1.5">
              <span class="font-sora font-bold text-[15px] text-[var(--text-primary)] tracking-wide">Nova</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
            </div>
          </nuxt-link-locale>

          <div class="flex items-center gap-2">
            <!-- Storefront Badge -->
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-plex text-[11px] text-[var(--text-secondary)]">
              <span class="font-bold text-[var(--text-primary)]">N</span>
              Storefront
            </span>
            <!-- Mobile close button -->
            <button
              type="button"
              class="lg:hidden w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
              @click="close"
            >
              <Icon name="lucide:x" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="flex-1 py-6 px-3 overflow-y-auto">
          <p class="font-plex text-[11px] text-[var(--text-muted)] tracking-wider px-3 mb-2 uppercase font-medium">
            Navigation
          </p>
          <nav class="space-y-1">
            <nuxt-link-locale
              v-for="item in navItems"
              :key="item.name"
              :to="item.to || '#'"
              class="flex items-center gap-3 px-3 py-2 rounded-lg font-jakarta text-[13px] font-medium transition duration-150"
              :class="[
                isItemActive(item.to)
                  ? 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              ]"
              @click="onNavClick"
            >
              <Icon
                :name="item.icon"
                class="w-4 h-4 shrink-0 transition"
                :class="isItemActive(item.to) ? 'text-[var(--warning)]' : 'text-[var(--text-muted)]'"
              />
              <span>{{ item.name }}</span>
            </nuxt-link-locale>
          </nav>
        </div>

        <!-- Bottom Telemetry Status Card -->
        <div class="p-3 border-t border-[var(--border-subtle)]">
          <div class="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
            <div class="flex items-center gap-2 font-plex text-[12px]">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
              <span class="text-[var(--text-secondary)]">Live signal ·</span>
              <span class="font-semibold text-[var(--text-primary)]">99.98%</span>
            </div>
            <button type="button" class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition p-1" title="Signal Configuration">
              <Icon name="lucide:sliders-horizontal" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </Transition>

  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { isOpen, close } = useSidebar()

// Track desktop breakpoint (>= 1024px) — sidebar always visible on lg+
const isDesktop = useMediaQuery('(min-width: 1024px)')

// Auto-close sidebar when viewport expands to desktop
watch(isDesktop, (desktop) => {
  if (desktop) close()
})

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: 'lucide:layout-grid' },
  { name: 'Products', to: '/dashboard/products', icon: 'lucide:archive' },
  { name: 'Orders', to: '/dashboard/orders', icon: 'lucide:shopping-bag' },
  { name: 'Customers', to: '/dashboard/customers', icon: 'lucide:users' },
  { name: 'Analytics', to: '/dashboard/analytics', icon: 'lucide:line-chart' },
  { name: 'Settings', to: '/dashboard/settings', icon: 'lucide:settings' },
]

function isItemActive(to: string) {
  if (!to) return false
  return route.path.endsWith(to) || route.path.includes(to)
}

// Close sidebar on mobile when a nav link is clicked
function onNavClick() {
  if (!isDesktop.value) close()
}
</script>

<style scoped>
/* Slide sidebar from the start edge — LTR: from left, RTL: from right */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

/* LTR */
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* RTL */
:global([dir='rtl']) .sidebar-enter-from,
:global([dir='rtl']) .sidebar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Overlay fade */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>