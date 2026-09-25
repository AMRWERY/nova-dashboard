<template>
  <!-- Sidebar Panel: fixed overlay drawer on mobile (< lg), static column on desktop (lg+) -->
  <aside
    class="fixed inset-y-0 start-0 z-50 w-60 h-screen bg-[#0A0C10] border-e border-[var(--border-subtle)] flex flex-col select-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:shrink-0"
    :class="[
      isOpen
        ? 'translate-x-0 shadow-2xl'
        : (isArabic ? 'translate-x-full' : '-translate-x-full')
    ]"
  >
    <!-- Mobile overlay backdrop teleported to body -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          @click="close"
        />
      </Transition>
    </Teleport>

    <!-- Brand / Storefront Header -->
    <div class="h-[60px] px-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
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
          <span>{{ isArabic ? 'المتجر' : 'Storefront' }}</span>
        </span>
        <!-- Mobile close button -->
        <button
          type="button"
          class="lg:hidden w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
          :aria-label="isArabic ? 'إغلاق القائمة' : 'Close sidebar'"
          @click="close"
        >
          <Icon name="lucide:x" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Navigation Section -->
    <div class="flex-1 py-6 px-3 overflow-y-auto">
      <p class="font-plex text-[11px] text-[var(--text-muted)] tracking-wider px-3 mb-2 uppercase font-medium">
        {{ isArabic ? 'التنقل' : 'Navigation' }}
      </p>
      <nav class="space-y-1">
        <nuxt-link-locale
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
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
          <span>{{ isArabic ? item.nameAr : item.nameEn }}</span>
        </nuxt-link-locale>
      </nav>
    </div>

    <!-- Bottom Telemetry Status Card -->
    <div class="p-3 border-t border-[var(--border-subtle)] shrink-0">
      <div class="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
        <div class="flex items-center gap-2 font-plex text-[12px]">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
          <span class="text-[var(--text-secondary)]">{{ isArabic ? 'إشارة حية ·' : 'Live signal ·' }}</span>
          <span class="font-semibold text-[var(--text-primary)]">99.98%</span>
        </div>
        <button
          type="button"
          class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition p-1"
          :title="isArabic ? 'إعدادات الإشارة' : 'Signal Configuration'"
        >
          <Icon name="lucide:sliders-horizontal" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute()
const { locale } = useI18n()
const { isOpen, close } = useSidebar()

const isArabic = computed(() => locale.value === 'ar')

const navItems = [
  { nameEn: 'Dashboard', nameAr: 'لوحة التحكم', to: '/dashboard', icon: 'lucide:layout-grid' },
  { nameEn: 'Products', nameAr: 'المنتجات', to: '/dashboard/products', icon: 'lucide:archive' },
  { nameEn: 'Orders', nameAr: 'الطلبات', to: '/dashboard/orders', icon: 'lucide:shopping-bag' },
  { nameEn: 'Customers', nameAr: 'العملاء', to: '/dashboard/customers', icon: 'lucide:users' },
  { nameEn: 'Analytics', nameAr: 'التحليلات', to: '/dashboard/analytics', icon: 'lucide:line-chart' },
  { nameEn: 'Settings', nameAr: 'الإعدادات', to: '/dashboard/settings', icon: 'lucide:settings' },
]

function isItemActive(to: string) {
  if (!to) return false
  const path = route.path.replace(/^\/(?:en|ar)/, '') || '/'
  return path === to || (to !== '/dashboard' && path.startsWith(to)) || (to === '/dashboard' && (path === '/dashboard' || path === '/dashboard/'))
}

// Close mobile drawer when a nav link is clicked
function onNavClick() {
  close()
}

// Close mobile drawer on route navigation
watch(() => route.path, () => {
  close()
})

// Close on Escape key
onMounted(() => {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  }
  window.addEventListener('keydown', onKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })
})
</script>

<style scoped>
/* Mobile overlay backdrop animation */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>