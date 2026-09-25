<template>
  <main class="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col items-center px-4 py-8">
    <div class="w-full max-w-[800px]">
      <!-- Top bar -->
      <header class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2.5">
          <span
            class="w-7 h-7 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid place-items-center"
            aria-hidden="true">
            <Icon name="lucide:sparkles" class="w-4 h-4 text-[#E8A23D]" />
          </span>
          <span class="font-sora font-semibold text-[15px]">Nova</span>
          <span class="w-1 h-1 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          <span class="font-plex text-[12px] text-[var(--text-muted)]">OS v4.18</span>
        </div>
        <span
          class="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--text-secondary)]">
          <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          BOOTSTRAP_INIT
        </span>
      </header>

      <!-- Stepper: step 1 completed, step 2 active -->
      <LazyVStepper :steps="steps" v-model="currentStep" accent="#E8A23D" interactive />

      <!-- Form panel -->
      <div class="rounded-[14px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 sm:p-10">

        <p class="font-plex text-[12px] mb-3" :style="{ color: accent }">STEP 02 / 03 · WORKSPACE CONFIGURATION</p>
        <h1 class="font-sora font-semibold text-[28px] leading-[34px]">Tell us about your business</h1>
        <p class="font-jakarta text-[14px] leading-[21px] text-[var(--text-secondary)] max-w-[72ch] mt-3">
          We'll configure your workspace URL, dashboard telemetry, and team invite routing based on your trade name.
        </p>

        <!-- Business name -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-2">
            <label for="business-name" class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)]">
              Business name
            </label>
            <span class="flex items-center gap-1.5 font-plex text-[12px]" :style="{ color: accent }">
              <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
              IDENTIFIER_VERIFIED
            </span>
          </div>
          <div class="relative">
            <input id="business-name" v-model="businessName" type="text" class="w-full h-11 px-3 pe-10 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]
                     font-jakarta text-[14px] text-[var(--text-primary)]
                     focus:border-[var(--border-strong)] focus:outline-none focus:ring-2"
              :style="{ '--tw-ring-color': accent + '66' }" />
            <span class="absolute end-3 top-1/2 -translate-y-1/2" aria-hidden="true">
              <Icon name="lucide:check-circle-2" class="w-4 h-4" :style="{ color: accent }" />
            </span>
          </div>

          <!-- URL assignment notice -->
          <div
            class="flex items-start gap-3 mt-3 px-4 py-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <Icon name="lucide:link" class="w-4 h-4 shrink-0 mt-0.5 text-[var(--text-muted)]" />
            <p class="font-jakarta text-[13px] leading-[19px] text-[var(--text-secondary)]">
              Workspace URL will be assigned to
              <span class="font-plex text-[13px] text-[var(--text-primary)]">{{ slug }}.nova.internal</span>
              (custom domain can be linked in settings).
            </p>
          </div>
        </div>

        <!-- Summary tiles -->
        <div class="grid sm:grid-cols-2 gap-4 mt-8">
          <div class="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4">
            <p class="font-plex text-[11px] text-[var(--text-muted)]">TENANT CATEGORY</p>
            <p class="flex items-center gap-2 font-jakarta text-[14px] font-medium text-[var(--text-primary)] mt-1.5">
              <Icon name="lucide:shopping-bag" class="w-4 h-4" :style="{ color: accent }" />
              Retail &amp; Commerce
            </p>
          </div>
          <div class="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4">
            <p class="font-plex text-[11px] text-[var(--text-muted)]">PROVISIONING PLAN</p>
            <p class="flex items-center gap-2 font-jakarta text-[14px] font-medium text-[var(--text-primary)] mt-1.5">
              <Icon name="lucide:cpu" class="w-4 h-4" :style="{ color: accent }" />
              Standard Cockpit
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-10">
          <LazyVButton variant="secondary" size="lg" @click="emit('prev')">
            Back
          </LazyVButton>

          <LazyVButton variant="primary" size="lg" block accent="#E8A23D" @click="emit('next')">
            Continue
          </LazyVButton>
        </div>

        <p class="text-center font-jakarta text-[12px] text-[var(--text-muted)] mt-6">
          You can rename your workspace or reassign root administrator permissions anytime.
        </p>
      </div>

      <!-- Footer -->
      <footer
        class="flex flex-col sm:flex-row items-center justify-between gap-2 font-plex text-[12px] text-[var(--text-muted)] mt-16">
        <span>SESSION_ID 0x9F4C20A7B1</span>
        <span>CLUSTER US-EAST-01</span>
        <span>ENCRYPTION TLS_AES_256</span>
      </footer>
    </div>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentStep?: number
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

const accent = '#E8A23D' // Retail tenant accent (§2.3)
const steps = ['Business type', 'Workspace setup', 'Launch dashboard']
const currentStep = ref(props.currentStep ?? 1)

watch(() => props.currentStep, (newVal) => {
  if (typeof newVal === 'number') {
    currentStep.value = newVal
  }
})

const businessName = ref('Apex Goods Co.')

/** apex-goods.nova.internal */
const slug = computed(() =>
  businessName.value
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
)
</script>t>