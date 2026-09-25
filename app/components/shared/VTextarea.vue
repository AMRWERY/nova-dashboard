<template>
  <div class="w-full">
    <!-- Top label row -->
    <div v-if="label || $slots.label || $slots['label-extra']" class="flex items-center justify-between mb-2">
      <label v-if="label || $slots.label" :for="textareaId"
        class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)] select-none">
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-[var(--danger)] ms-0.5">*</span>
      </label>
      <slot name="label-extra" />
    </div>

    <!-- Textarea wrapper container -->
    <div class="relative w-full flex items-center">
      <!-- Leading icon / slot -->
      <div v-if="$slots.leading || prefixIcon"
        class="absolute start-3 top-3 text-[var(--text-muted)] pointer-events-none z-10 flex items-center">
        <slot name="leading">
          <Icon v-if="prefixIcon" :name="prefixIcon" class="w-4 h-4" />
        </slot>
      </div>

      <textarea :id="textareaId" ref="textareaRef" v-model="inputValue" :name="name" :rows="rows"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength"
        :class="textareaClasses" :style="computedStyle" @blur="handleBlur" @focus="$emit('focus', $event)"
        v-bind="$attrs" />

      <!-- Trailing icon / slot -->
      <div v-if="$slots.trailing" class="absolute end-3 top-3 text-[var(--text-muted)] z-10">
        <slot name="trailing" />
      </div>
    </div>

    <!-- Error message or Hint text or Character count -->
    <div class="flex items-center justify-between mt-1.5 font-jakarta text-[12px]">
      <div>
        <p v-if="hasError" class="text-[var(--danger)] flex items-center gap-1.5">
          <span>{{ displayError }}</span>
        </p>
        <p v-else-if="hint || $slots.hint" :id="`${textareaId}-hint`" class="text-[var(--text-muted)]">
          <slot name="hint">{{ hint }}</slot>
        </p>
      </div>

      <span v-if="maxlength" class="text-[var(--text-muted)] ms-auto">
        {{ String(inputValue || '').length }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { TextareaResize } from '~/types/shared/VTextarea'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    name?: string
    rules?: any
    label?: string
    id?: string
    placeholder?: string
    accent?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    hint?: string
    error?: string
    rows?: number | string
    maxlength?: number | string
    resize?: TextareaResize
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
    readonly: false,
    required: false,
    hint: '',
    error: '',
    rows: 3,
    maxlength: undefined,
    resize: 'y',
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
const textareaId = computed(() => props.id || props.name || `v-textarea-${generatedId}`)

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

const resizeClasses: Record<TextareaResize, string> = {
  none: 'resize-none',
  y: 'resize-y',
  x: 'resize-x',
  both: 'resize',
}

// Component styling according to Nova Design Spec §5
const textareaClasses = computed(() => {
  const hasLeading = slots.leading || props.prefixIcon
  const hasTrailing = slots.trailing

  return [
    'w-full font-jakarta text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
    'bg-[var(--bg-elevated)] border transition-all duration-150',
    'rounded-lg p-3 min-h-[96px]', // Controls radius (§1.3)
    resizeClasses[props.resize],
    hasLeading ? 'ps-9' : '',
    hasTrailing ? 'pe-10' : '',
    hasError.value
      ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:outline-none focus:ring-2 focus:ring-[var(--danger)]/30'
      : 'border-[var(--border-subtle)] focus:border-[var(--border-strong)] focus:outline-none focus:ring-2',
    props.disabled ? 'opacity-50 cursor-not-allowed bg-[var(--bg-surface)]' : '',
    props.readonly ? 'cursor-default bg-[var(--bg-surface)]' : '',
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