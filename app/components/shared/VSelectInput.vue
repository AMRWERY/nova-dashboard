<template>
  <div class="w-full">
    <!-- Top label row -->
    <div v-if="label || $slots.label || $slots['label-extra']" class="flex items-center justify-between mb-2">
      <label v-if="label || $slots.label" :for="selectId"
        class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)] select-none">
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-[var(--danger)] ms-0.5">*</span>
      </label>
      <slot name="label-extra" />
    </div>

    <!-- Select wrapper container -->
    <div class="relative w-full flex items-center">
      <!-- Leading icon / slot -->
      <div v-if="$slots.leading || prefixIcon"
        class="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none z-10 flex items-center">
        <slot name="leading">
          <Icon v-if="prefixIcon" :name="prefixIcon" class="w-4 h-4" />
        </slot>
      </div>

      <select :id="selectId" ref="selectRef" v-model="inputValue" :name="name" :disabled="disabled"
        :class="[selectClasses, 'appearance-none pe-10 cursor-pointer']" :style="computedStyle" @blur="handleBlur"
        @focus="$emit('focus', $event)">
        <option v-if="placeholder" value="" disabled selected class="bg-[var(--bg-elevated)] text-[var(--text-muted)]">
          {{ placeholder }}
        </option>
        <template v-if="options && options.length">
          <option v-for="opt in options" :key="String(opt.value)" :value="opt.value" :disabled="opt.disabled"
            class="bg-[var(--bg-elevated)] text-[var(--text-primary)]">
            {{ opt.label }}
          </option>
        </template>
        <slot v-else />
      </select>

      <!-- Trailing dropdown arrow icon / slot -->
      <div
        class="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[var(--text-muted)] pointer-events-none z-10">
        <slot name="trailing">
          <Icon name="lucide:chevron-down" class="w-4 h-4" />
        </slot>
      </div>
    </div>

    <!-- Error message or Hint text -->
    <p v-if="hasError" class="font-jakarta text-[12px] text-[var(--danger)] mt-1.5 flex items-center gap-1.5">
      <span>{{ displayError }}</span>
    </p>
    <p v-else-if="hint || $slots.hint" :id="`${selectId}-hint`"
      class="font-jakarta text-[12px] text-[var(--text-muted)] mt-1.5">
      <slot name="hint">{{ hint }}</slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { SelectOption } from '~/types/shared/VSelectInput'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    name?: string
    rules?: any
    label?: string
    id?: string
    placeholder?: string
    accent?: string
    disabled?: boolean
    required?: boolean
    hint?: string
    error?: string
    options?: SelectOption[]
    prefixIcon?: string
  }>(),
  {
    modelValue: '',
    name: '',
    rules: undefined,
    label: '',
    id: undefined,
    placeholder: '',
    accent: undefined,
    disabled: false,
    required: false,
    hint: '',
    error: '',
    options: () => [],
    prefixIcon: undefined,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const slots = useSlots()
const generatedId = useId()
const selectId = computed(() => props.id || props.name || `v-select-${generatedId}`)

// Vee-Validate field registration if `name` prop is supplied
const fieldName = computed(() => props.name)
const {
  value: fieldValue,
  errorMessage: fieldErrorMessage,
  handleBlur: fieldBlur,
} = fieldName.value
    ? useField(fieldName, props.rules, {
      initialValue: props.modelValue,
      syncVModel: true,
      label: props.label || props.name,
    })
    : { value: ref(props.modelValue), errorMessage: ref(''), handleBlur: () => { } }

const inputValue = computed({
  get() {
    if (props.name) return fieldValue.value
    return props.modelValue
  },
  set(val) {
    if (props.name) {
      fieldValue.value = val
    }
    emit('update:modelValue', val)
  },
})

const handleBlur = (e: FocusEvent) => {
  if (props.name) fieldBlur(e)
  emit('blur', e)
}

const displayError = computed(() => {
  if (props.error) return props.error
  if (props.name && fieldErrorMessage.value) return fieldErrorMessage.value
  return ''
})

const hasError = computed(() => !!displayError.value)

// Component styling according to Nova Design Spec §5
const selectClasses = computed(() => {
  const hasLeading = slots.leading || props.prefixIcon

  return [
    'w-full font-jakarta text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
    'bg-[var(--bg-elevated)] border transition-all duration-150',
    'rounded-lg h-10 px-3', // Controls radius (§1.3)
    hasLeading ? 'ps-9' : '',
    hasError.value
      ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:outline-none focus:ring-2 focus:ring-[var(--danger)]/30'
      : 'border-[var(--border-subtle)] focus:border-[var(--border-strong)] focus:outline-none focus:ring-2',
    props.disabled ? 'opacity-50 cursor-not-allowed bg-[var(--bg-surface)]' : '',
  ]
})

const computedStyle = computed(() => {
  if (hasError.value) return {}
  const ringColor = props.accent ? props.accent + '66' : 'var(--signal)'
  return {
    '--tw-ring-color': ringColor,
  }
})
</script>