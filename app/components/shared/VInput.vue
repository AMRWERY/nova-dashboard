<template>
  <div class="w-full">
    <!-- Top label row -->
    <div v-if="label || $slots.label || $slots['label-extra']" class="flex items-center justify-between mb-2">
      <label v-if="label || $slots.label" :for="inputId"
        class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)] select-none">
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-[var(--danger)] ms-0.5">*</span>
      </label>
      <slot name="label-extra" />
    </div>

    <!-- Input wrapper container -->
    <div class="relative w-full flex items-center">
      <!-- Leading icon / slot -->
      <div v-if="$slots.leading || prefixIcon"
        class="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none z-10 flex items-center">
        <slot name="leading">
          <Icon v-if="prefixIcon" :name="prefixIcon" class="w-4 h-4" />
        </slot>
      </div>

      <!-- INPUT Element (text, email, password, number, etc.) -->
      <input :id="inputId" ref="inputRef" v-model="inputValue" :name="name" :type="computedType"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete"
        :class="inputClasses" :style="computedStyle" @blur="handleBlur" @focus="$emit('focus', $event)" />

      <!-- Trailing icon / password toggle / suffix slot -->
      <div v-if="$slots.trailing || type === 'password'"
        class="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[var(--text-muted)] z-10">
        <!-- Password visibility toggle button -->
        <button v-if="type === 'password'" type="button"
          class="p-1 hover:text-[var(--text-primary)] transition-colors focus:outline-none flex items-center justify-center"
          tabindex="-1" :title="isPasswordShown ? 'Hide password' : 'Show password'"
          @click="isPasswordShown = !isPasswordShown">
          <Icon :name="isPasswordShown ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
        </button>

        <slot name="trailing" />
      </div>
    </div>

    <!-- Error message or Hint text (§5 input spec) -->
    <p v-if="hasError" class="font-jakarta text-[12px] text-[var(--danger)] mt-1.5 flex items-center gap-1.5">
      <span>{{ displayError }}</span>
    </p>
    <p v-else-if="hint || $slots.hint" :id="`${inputId}-hint`"
      class="font-jakarta text-[12px] text-[var(--text-muted)] mt-1.5">
      <slot name="hint">{{ hint }}</slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { InputType } from '~/types/shared/VInput'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    name?: string
    rules?: any
    label?: string
    type?: InputType
    id?: string
    placeholder?: string
    autocomplete?: string
    accent?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    hint?: string
    error?: string
    prefixIcon?: string
  }>(),
  {
    modelValue: '',
    name: '',
    rules: undefined,
    label: '',
    type: 'text',
    id: undefined,
    placeholder: '',
    autocomplete: undefined,
    accent: undefined,
    disabled: false,
    readonly: false,
    required: false,
    hint: '',
    error: '',
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
const inputId = computed(() => props.id || props.name || `v-input-${generatedId}`)
const isPasswordShown = ref(false)

const computedType = computed(() => {
  if (props.type === 'password' && isPasswordShown.value) {
    return 'text'
  }
  return props.type
})

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
const inputClasses = computed(() => {
  const hasLeading = slots.leading || props.prefixIcon
  const hasTrailing = slots.trailing || props.type === 'password'

  return [
    'w-full font-jakarta text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
    'bg-[var(--bg-elevated)] border transition-all duration-150',
    'rounded-lg h-10 px-3', // Controls radius (§1.3)
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