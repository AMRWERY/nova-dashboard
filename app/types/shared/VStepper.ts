export interface StepItem {
  label: string
  description?: string
  icon?: string
}

export type SteperStep = string | StepItem
