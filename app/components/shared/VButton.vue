<template>
  <component :is="componentTag" :to="to" :href="href" :type="isButton ? type : undefined"
    :disabled="isButton ? (disabled || loading) : undefined" :aria-disabled="disabled || loading ? 'true' : undefined"
    :class="[
      // Base design system specs (§1.3 radius 8px for controls, §5 button states)
      'inline-flex items-center justify-center font-jakarta font-medium transition-all duration-150 select-none cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)]',
      'active:scale-[.98]',
      pill ? 'rounded-full' : 'rounded-lg',
      block ? 'w-full' : '',
      (disabled || loading) ? 'opacity-40 pointer-events-none cursor-not-allowed' : '',
      sizeClasses[size],
      variantClasses[variant],
    ]" :style="customStyle" v-bind="$attrs">
    <!-- Loading spinner indicator -->
    <Icon v-if="loading" name="lucide:loader-2" class="animate-spin -ms-1 me-2 h-4 w-4 text-current" />

    <!-- Leading Icon / Slot -->
    <slot name="leading" />

    <!-- Button label content -->
    <slot />

    <!-- Trailing Icon / Slot -->
    <slot name="trailing" />
  </component>
</template>

<script lang="ts" setup>
import type { ButtonVariant, ButtonSize } from '~/types/shared/VButton'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    to?: string | object
    href?: string
    type?: 'button' | 'submit' | 'reset'
    accent?: string
    disabled?: boolean
    loading?: boolean
    block?: boolean
    pill?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    accent: undefined,
    disabled: false,
    loading: false,
    block: false,
    pill: false,
  }
)

const componentTag = computed(() => {
  if (props.to) return resolveComponent('nuxt-link-locale')
  if (props.href) return 'a'
  return 'button'
})

const isButton = computed(() => componentTag.value === 'button')

// Size specifications according to §5 of design.md
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[12px] leading-[16px] gap-1.5',
  md: 'h-10 px-4 text-[13px] leading-[18px] gap-2',
  lg: 'h-12 px-6 text-[14px] leading-[21px] gap-2.5',
}

// Variant specifications according to §5 of design.md
const variantClasses: Record<ButtonVariant, string> = {
  primary: props.accent
    ? 'text-[var(--text-on-accent)] hover:brightness-110'
    : 'bg-[var(--signal)] text-[var(--text-on-accent)] hover:brightness-110 focus-visible:ring-[var(--signal)]',
  secondary:
    'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:border-[var(--border-strong)] focus-visible:ring-[var(--signal)]/40',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] focus-visible:ring-[var(--signal)]/40',
  danger:
    'bg-[var(--danger)] text-white hover:brightness-110 focus-visible:ring-[var(--danger)]/50',
}

// Dynamic style binding when custom accent color is passed
const customStyle = computed(() => {
  if (props.variant === 'primary' && props.accent) {
    return {
      backgroundColor: props.accent,
      '--tw-ring-color': props.accent,
    }
  }
  return {}
})
</script>