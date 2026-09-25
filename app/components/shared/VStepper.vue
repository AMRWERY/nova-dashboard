<template>
  <div class="rounded-[14px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-6 sm:px-12 py-6 mb-10">
    <ol class="relative grid gap-4"
      :style="{ gridTemplateColumns: `repeat(${formattedSteps.length}, minmax(0, 1fr))` }">
      <!-- Connector line behind step badges -->
      <span v-if="formattedSteps.length > 1"
        class="absolute top-4 h-px transition-all duration-300"
        :style="[connectorStyle, { backgroundColor: activeAccent }]"
        aria-hidden="true" />

      <li v-for="(step, i) in formattedSteps" :key="step.label"
        class="relative flex flex-col items-center text-center group select-none"
        :class="{ 'cursor-pointer': interactive && i <= activeIndex }" @click="handleStepClick(i)">
        <!-- Step Circle Badge -->
        <span
          class="w-9 h-9 rounded-full grid place-items-center font-plex text-[13px] z-10 transition-all duration-200"
          :class="[
            i <= activeIndex
              ? 'text-[#0A0C10] font-semibold shadow-md'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]',
          ]" :style="i <= activeIndex ? { backgroundColor: activeAccent } : {}">
          <Icon v-if="i < activeIndex && showCheckOnComplete" name="lucide:check"
            class="w-4.5 h-4.5 text-[#0A0C10] stroke-[2.5]" />
          <span v-else :class="{ 'text-[#0A0C10]': i <= activeIndex }">{{ i + 1 }}</span>
        </span>

        <!-- Step Label -->
        <span class="font-sora font-semibold text-[14px] mt-2 transition-colors duration-200"
          :class="i <= activeIndex ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'">
          {{ step.label }}
        </span>

        <!-- Step Status Badge -->
        <span v-if="i === activeIndex" class="font-plex text-[11px] font-medium mt-0.5 tracking-wider"
          :style="{ color: activeAccent }">
          ACTIVE
        </span>
        <span v-else-if="i < activeIndex" class="font-plex text-[11px] text-[var(--text-muted)] mt-0.5 tracking-wider">
          COMPLETED
        </span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import type { SteperStep, StepItem } from '~/types/shared/VStepper'

const props = withDefaults(
  defineProps<{
    steps?: SteperStep[]
    modelValue?: number
    currentStep?: number
    accent?: string
    interactive?: boolean
    showCheckOnComplete?: boolean
  }>(),
  {
    steps: () => [],
    modelValue: undefined,
    currentStep: undefined,
    accent: '#E8A23D',
    interactive: false,
    showCheckOnComplete: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', index: number): void
  (e: 'update:currentStep', index: number): void
  (e: 'change', index: number): void
}>()

const activeIndex = computed(() => {
  if (typeof props.modelValue === 'number') return props.modelValue
  if (typeof props.currentStep === 'number') return props.currentStep
  return 0
})

const activeAccent = computed(() => props.accent || '#E8A23D')

const formattedSteps = computed<StepItem[]>(() => {
  return props.steps.map((step) => {
    if (typeof step === 'string') {
      return { label: step }
    }
    return step
  })
})

const connectorStyle = computed(() => {
  const count = formattedSteps.value.length
  if (count <= 1) return { display: 'none' }
  const percentOffset = Math.round(100 / (count * 2))
  return {
    insetInlineStart: `${percentOffset}%`,
    insetInlineEnd: `${percentOffset}%`,
  }
})

const handleStepClick = (index: number) => {
  if (props.interactive && index <= activeIndex.value) {
    emit('update:modelValue', index)
    emit('update:currentStep', index)
    emit('change', index)
  }
}
</script>