<template>
  <main
    class="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col items-center justify-center px-4">
    <!-- Brand mark -->
    <div class="w-14 h-14 rounded-[14px] grid place-items-center mb-10 transition-colors duration-300"
      :style="{ backgroundColor: accent(activeType) }" aria-hidden="true">
      <Icon name="lucide:sparkles" class="w-7 h-7 text-[#0A0C10]" />
    </div>

    <!-- Headline -->
    <h1 class="font-sora font-semibold text-center text-[28px] leading-[34px] md:text-[36px] md:leading-[44px]">
      One dashboard. Any business.
    </h1>

    <!-- Supporting copy -->
    <p class="font-jakarta text-center text-[14px] leading-[21px] text-[var(--text-secondary)] max-w-[72ch] mt-4">
      Nova adapts its layout, vocabulary, and telemetry in real time to match
      how your business actually operates — from retail to client services.
    </p>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row items-center gap-3 mt-8">
      <LazyVButton to="/auth/sign-up" size="lg" :accent="accent(activeType)">
        Create your dashboard
      </LazyVButton>
      <LazyVButton to="/auth" variant="secondary" size="lg">
        Sign in
      </LazyVButton>
    </div>

    <!-- Business-type switcher (tenant accent preview, §6) -->
    <div
      class="flex items-center gap-1 mt-12 px-2 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
      <template v-for="(type, i) in businessTypes" :key="type.id">
        <span v-if="i > 0" class="text-[var(--text-muted)] text-[12px]" aria-hidden="true">·</span>
        <LazyVButton variant="ghost" size="sm" pill :aria-pressed="activeType === type.id"
          :class="activeType === type.id ? '!text-[var(--text-primary)]' : '!text-[var(--text-muted)] hover:!text-[var(--text-secondary)]'"
          @click="activeType = type.id">
          <template #leading>
            <span class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="activeType === type.id ? '' : 'opacity-40'" :style="{ backgroundColor: type.accent }"
              aria-hidden="true" />
          </template>
          {{ type.label }}
        </LazyVButton>
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { BusinessType } from '~/types/landing';

const businessTypes: BusinessType[] = [
  { id: 'retail', label: 'Retail', accent: '#E8A23D' },
  { id: 'food', label: 'Food service', accent: '#F0705A' },
  { id: 'realestate', label: 'Real estate', accent: '#2FB6C4' },
  { id: 'agency', label: 'Agency', accent: '#8B7CF6' },
]

const activeType = ref<BusinessType['id']>('retail')
const accent = (id: BusinessType['id']) =>
  businessTypes.find(t => t.id === id)?.accent ?? '#E8A23D'

useSeoPage({
  title: () => 'Nova Dashboard',
  description: () => 'One dashboard. Any business.',
});
</script>