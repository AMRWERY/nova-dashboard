<template>
  <main class="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col items-center px-4 py-8">
    <!-- Centered onboarding column -->
    <div class="w-full max-w-[800px]">
      <!-- Top bar -->
      <header class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-md bg-[var(--warning)] grid place-items-center" aria-hidden="true">
            <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#0A0C10]" />
          </span>
          <span class="font-sora font-bold text-[15px] tracking-wide">NOVA</span>
          <span class="font-plex text-[12px] text-[var(--text-muted)]">OS v4.18</span>
        </div>
        <span
          class="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--text-muted)]">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" aria-hidden="true" />
          BOOTSTRAP_INIT
        </span>
      </header>

      <!-- Stepper Component -->
      <LazyVStepper :steps="steps" v-model="currentStep" accent="#E8A23D" />

      <!-- Heading -->
      <p class="font-plex text-[12px] text-[var(--text-muted)] mb-3">STEP 01 / 03 · SYSTEM TAXONOMY</p>
      <h1 class="font-sora font-semibold text-[28px] leading-[34px]">What kind of business is this?</h1>
      <p class="font-jakarta text-[14px] leading-[21px] text-[var(--text-secondary)] max-w-[72ch] mt-3">
        This shapes your metrics, vocabulary, telemetry pipelines, and default layout from day one.
      </p>

      <!-- Business-type grid (§1.1: cards reserved for genuinely distinct objects) -->
      <div class="grid sm:grid-cols-2 gap-4 mt-8" role="radiogroup" aria-label="Business type">
        <button v-for="type in businessTypes" :key="type.id" type="button" role="radio"
          :aria-checked="selected === type.id" class="relative text-start rounded-[14px] bg-[var(--bg-elevated)] p-5 transition
                 focus-visible:outline-none focus-visible:ring-2" :class="selected === type.id
                  ? 'border'
                  : 'border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'" :style="selected === type.id
                    ? { borderColor: type.accent, '--tw-ring-color': type.accent + '66' }
                    : { '--tw-ring-color': type.accent + '66' }" @click="selected = type.id">
          <!-- Selected check -->
          <span v-if="selected === type.id" class="absolute top-4 end-4 w-6 h-6 rounded-full grid place-items-center"
            :style="{ backgroundColor: type.accent }" aria-hidden="true">
            <Icon name="lucide:check" class="w-3.5 h-3.5 text-[#0A0C10]" />
          </span>

          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg grid place-items-center shrink-0"
              :style="{ backgroundColor: type.accent + '1F' }" aria-hidden="true">
              <Icon :name="type.icon" class="w-5 h-5" :style="{ color: type.accent }" />
            </span>
            <div>
              <h3 class="font-sora font-semibold text-[16px] leading-[22px]">{{ type.name }}</h3>
              <p class="font-plex text-[12px] text-[var(--text-muted)] mt-0.5">
                <span :style="{ color: selected === type.id ? type.accent : undefined }">{{ type.signalName }}</span>
                · {{ type.accent }}
              </p>
            </div>
          </div>

          <p class="font-jakarta text-[13px] leading-[19px] text-[var(--text-secondary)] mt-4">
            {{ type.description }}
          </p>
        </button>
      </div>

      <!-- Actions -->
      <LazyVButton size="lg" block accent="#E8A23D" class="mt-10" @click="emit('next')">
        Continue
      </LazyVButton>

      <p class="text-center font-jakarta text-[12px] text-[var(--text-muted)] mt-4">
        You can reconfigure or add secondary business lines anytime in settings.
      </p>

      <!-- Footer -->
      <footer class="text-center font-plex text-[12px] text-[var(--text-muted)] mt-16">
        SESSION_ID 0x9F4C20A7B1 · CLUSTER US-EAST-01 · ENCRYPTION TLS_AES_256
      </footer>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { BusinessType } from '~/types/onboarding';

const props = defineProps<{
  currentStep?: number
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const businessTypes: BusinessType[] = [
  {
    id: 'retail', name: 'Retail / E-commerce', signalName: 'Amber Signal', accent: '#E8A23D',
    description: 'Online stores, storefronts, orders, inventory pacing & GMV', icon: 'lucide:shopping-bag',
  },
  {
    id: 'restaurant', name: 'Restaurant / Food service', signalName: 'Coral Signal', accent: '#F0705A',
    description: 'Covers, table turnover, POS sync, shifts & kitchen throughput', icon: 'lucide:utensils',
  },
  {
    id: 'realestate', name: 'Real Estate', signalName: 'Teal Signal', accent: '#2FB6C4',
    description: 'Active listings, pipeline deals, client escrows & agent pacing', icon: 'lucide:building-2',
  },
  {
    id: 'services', name: 'Professional Services', signalName: 'Violet Signal', accent: '#8B7CF6',
    description: 'Billable utilization, retainer burn, project milestones & invoicing', icon: 'lucide:briefcase',
  },
  {
    id: 'health', name: 'Health & Wellness', signalName: 'Mint Signal', accent: '#3FCB8C',
    description: 'Client appointments, membership retention & practitioner capacity', icon: 'lucide:activity',
  },
  {
    id: 'other', name: 'Other Operations', signalName: 'Signal Blue', accent: '#5B7FFF',
    description: 'Custom operational model with adaptive metrics and generic terminology', icon: 'lucide:sliders',
  },
]

const selected = ref<BusinessType['id']>('retail')
const steps = ['Business type', 'Workspace setup', 'Launch dashboard']
const currentStep = ref(props.currentStep ?? 0)

watch(() => props.currentStep, (newVal) => {
  if (typeof newVal === 'number') {
    currentStep.value = newVal
  }
})
</script>