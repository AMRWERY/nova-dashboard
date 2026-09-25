<template>
  <main class="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col items-center px-4 py-8">

    <div class="w-full max-w-[800px]">

      <!-- Top bar -->
      <header class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2.5">
          <span class="w-7 h-7 rounded-lg bg-[var(--warning)] grid place-items-center" aria-hidden="true">
            <Icon name="lucide:sparkles" class="w-4 h-4 text-[#0A0C10]" />
          </span>
          <span class="font-sora font-bold text-[15px] tracking-wide">Nova</span>
          <span class="font-plex text-[12px] text-[var(--text-muted)]">OS v4.18</span>
        </div>
        <span class="inline-flex items-center gap-2 h-7 px-3.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--warning)]">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" aria-hidden="true" />
          PROVISIONING COMPLETE
        </span>
      </header>

      <!-- Stepper Component -->
      <VStepper :steps="steps" v-model="currentStep" accent="#E8A23D" interactive />

      <!-- Step Title & Description -->
      <p class="font-plex text-[12px] text-[var(--warning)] tracking-wider mb-1.5">Step 03 / 03 · Tenant Provisioning</p>
      <h1 class="font-sora font-semibold text-[32px] leading-[38px] text-[var(--text-primary)]">You're all set</h1>
      <p class="font-jakarta text-[14px] leading-[22px] text-[var(--text-secondary)] mt-2 mb-8">
        Apex Goods Co. is ready as a Retail / E-commerce dashboard.
      </p>

      <!-- Main Provisioned Environment Card -->
      <div class="rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-3.5">
        
        <!-- Header status banner inside card -->
        <div class="rounded-xl bg-[#12151B]/90 border border-[var(--border-subtle)] px-4 py-3.5 flex items-center justify-between">
          <div class="flex items-center gap-2.5 font-sora font-semibold text-[15px] text-[var(--text-primary)]">
            <Icon name="lucide:shield-check" class="w-5 h-5 text-[var(--warning)]" />
            <span>Provisioned environment</span>
          </div>
          <span class="font-plex text-[12px] text-[var(--warning)] flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
            Ready for ingestion
          </span>
        </div>

        <!-- Field 1: Business name -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-3.5 flex items-center justify-between">
          <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Business name</span>
          <span class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">Apex Goods Co.</span>
        </div>

        <!-- Field 2: Tenant archetype -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-3.5 flex items-center justify-between">
          <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Tenant archetype</span>
          <span class="h-7 px-3 rounded-full bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20 font-plex text-[12px] font-medium flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
            Retail / E-commerce
          </span>
        </div>

        <!-- Field 3: Workspace URL -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-3.5 flex items-center justify-between">
          <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Workspace URL</span>
          <div class="flex items-center gap-2">
            <span class="font-plex text-[13px] text-[var(--text-primary)]">apex-goods.nova.internal</span>
            <button
              type="button"
              class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition p-1"
              title="Copy URL"
              @click="copyUrl"
            >
              <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4 text-[var(--warning)]" />
            </button>
          </div>
        </div>

        <!-- Field 4: Default telemetry -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Default telemetry</span>
          <div class="flex flex-wrap items-center gap-2">
            <span
              v-for="item in telemetryItems"
              :key="item"
              class="font-plex text-[12px] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-2.5 py-1 rounded-md"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <!-- Field 5: Data pipelines -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-3.5 flex items-center justify-between">
          <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Data pipelines</span>
          <span class="font-plex text-[13px] text-[var(--text-primary)] flex items-center gap-2">
            <Icon name="lucide:activity" class="w-4 h-4 text-[var(--warning)]" />
            Retail stream ingestion initialized (US-East-01)
          </span>
        </div>

        <!-- Field 6: Cluster nodes handshake -->
        <div class="rounded-xl bg-[#12151B]/80 border border-[var(--border-subtle)] px-4 py-4">
          <div class="flex items-center justify-between font-jakarta text-[13px]">
            <span class="text-[var(--text-secondary)]">Cluster nodes handshake</span>
            <span class="font-plex font-medium text-[var(--warning)]">4 / 4 operational</span>
          </div>
          <div class="grid grid-cols-4 gap-2 mt-3.5">
            <div v-for="n in 4" :key="n" class="h-1.5 rounded-full bg-[var(--warning)]" />
          </div>
        </div>

      </div>

      <!-- Actions -->
      <div class="flex gap-3 mt-8">
        <VButton variant="secondary" size="lg" @click="emit('prev')">
          Back
        </VButton>
        <VButton variant="primary" size="lg" block accent="#E8A23D" @click="handleDashboard">
          Go to dashboard
        </VButton>
      </div>

      <p class="text-center font-jakarta text-[12px] text-[var(--text-muted)] mt-4">
        Your telemetry endpoints and API keys are accessible anytime in workspace settings.
      </p>

      <!-- Footer Info -->
      <footer class="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-5 py-4 font-plex text-[12px] text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-3 mt-12">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
          <span>SESSION_ID: <strong class="text-[var(--text-primary)]">NV-8842-X09</strong></span>
        </div>
        <div>
          <span>CLUSTER: <strong class="text-[var(--text-primary)]">US-EAST-01</strong></span>
        </div>
        <div>
          <span>ENCRYPTION: <strong class="text-[var(--text-primary)]">TLS_AES_256</strong></span>
        </div>
        <div>
          <span>STATUS: <strong class="text-[var(--warning)]">200_OK</strong></span>
        </div>
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
  (e: 'finish'): void
}>()

const steps = ['Business type', 'Workspace setup', 'Launch dashboard']
const currentStep = ref(props.currentStep ?? 2)

watch(() => props.currentStep, (newVal) => {
  if (typeof newVal === 'number') {
    currentStep.value = newVal
  }
})

const copied = ref(false)
const telemetryItems = ['GMV', 'Order volume', 'Live inventory sync', 'Refund rate']

function copyUrl() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText('apex-goods.nova.internal')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const localePath = useLocalePath()

function handleDashboard() {
  emit('finish')
  navigateTo(localePath('/dashboard'))
}
</script>