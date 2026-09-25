<template>
  <div class="h-[60px] px-4 sm:px-6 bg-[#0A0C10] border-b border-[var(--border-subtle)] flex items-center gap-3 justify-between select-none">
    <!-- Mobile Hamburger Menu Button -->
    <button
      type="button"
      class="lg:hidden w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition shrink-0"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-4 h-4" />
    </button>

    <!-- Search Bar -->
    <div class="relative w-full max-w-[340px]">
      <div class="flex items-center w-full h-9 px-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus-within:border-[var(--border-strong)] transition">
        <Icon name="lucide:search" class="w-4 h-4 text-[var(--text-muted)] me-2 shrink-0" />
        <input
          type="text"
          placeholder="Search telemetry or orders..."
          class="w-full bg-transparent font-jakarta text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
        />
        <kbd class="font-plex text-[11px] text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded shrink-0">
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Center Active Tenant Pill -->
    <div class="hidden md:flex items-center gap-2 h-8 px-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--text-secondary)]">
      <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
      <span>Apex Goods Co. · Retail</span>
    </div>

    <!-- Right User Controls -->
    <div class="flex items-center gap-3.5">
      <!-- Language Switcher Button -->
      <button
        type="button"
        class="flex items-center gap-2 h-9 px-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition"
        :title="locale === 'en' ? 'التحويل إلى العربية' : 'Switch to English'"
        @click="toggleLanguage"
      >
        <Icon name="lucide:languages" class="w-4 h-4 text-[var(--warning)] shrink-0" />
        <span class="font-semibold">{{ currentLocaleLabel }}</span>
      </button>

      <!-- Notifications -->
      <button
        type="button"
        class="relative w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition"
        title="Notifications"
      >
        <Icon name="lucide:bell" class="w-4 h-4" />
        <span class="absolute top-2 end-2 w-2 h-2 rounded-full bg-[var(--warning)]" />
      </button>

      <span class="w-px h-4 bg-[var(--border-subtle)]" aria-hidden="true" />

      <!-- User Avatar Profile -->
      <button
        type="button"
        class="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[var(--bg-surface)] transition text-start"
      >
        <div class="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shrink-0">
          <img
            src="/img/fake-user.png"
            alt="Amr Profile"
            class="w-full h-full object-cover"
          />
          <span class="absolute bottom-0 end-0 w-2 h-2 rounded-full bg-[#3FCB8C] border border-[#0A0C10]" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isOpen, toggle, close } = useSidebar()
const { showOverlay, hideOverlay } = useLocaleOverlay()

const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocaleLabel = computed(() => (locale.value === 'ar' ? 'العربية' : 'EN'))

async function toggleLanguage() {
  close()
  const nextLocale = locale.value === 'en' ? 'ar' : 'en'
  showOverlay(nextLocale)

  try {
    const nextPath = switchLocalePath(nextLocale)
    if (nextPath) {
      await navigateTo(nextPath)
    } else {
      await setLocale(nextLocale)
    }
  } finally {
    // Settle time for layout reorientation and smooth fade out
    hideOverlay(400)
  }
}
</script>
