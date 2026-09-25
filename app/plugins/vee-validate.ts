import { defineRule, configure } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  confirmed,
  digits,
  regex,
  alpha_num,
  numeric,
  length,
  between,
} from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  // ── Explicitly imported rules (Tree-shakeable) ───────────────────────────
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('confirmed', confirmed)
  defineRule('digits', digits)
  defineRule('regex', regex)
  defineRule('alpha_num', alpha_num)
  defineRule('numeric', numeric)
  defineRule('length', length)
  defineRule('between', between)

  // ── Configure Vee-Validate ───────────────────────────────────────────────
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
    generateMessage: (ctx) => {
      const field = ctx.field || 'Field'
      const rule = ctx.rule?.name
      const params = (ctx.rule?.params as any[]) || []

      switch (rule) {
        case 'required':
          return `${field} is required`
        case 'email':
          return `${field} must be a valid email address`
        case 'min':
          return `${field} must be at least ${params[0]} characters`
        case 'max':
          return `${field} must not exceed ${params[0]} characters`
        case 'confirmed':
          return `${field} confirmation does not match`
        case 'digits':
          return `${field} must be ${params[0]} digits`
        case 'numeric':
          return `${field} must be a number`
        default:
          return `${field} is not valid`
      }
    },
  })
})
