<template>
  <div>
    <Transition name="fade" mode="out-in">
      <lazy-step-one-business-type v-if="currentStep === 0" :current-step="currentStep" @next="currentStep = 1" />

      <lazy-step-two-details v-else-if="currentStep === 1" :current-step="currentStep" @prev="currentStep = 0"
        @next="currentStep = 2" />

      <lazy-step-three-confirm v-else-if="currentStep === 2" :current-step="currentStep" @prev="currentStep = 1"
        @finish="onFinish" />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const currentStep = ref(0)
const localePath = useLocalePath()

function onFinish() {
  navigateTo(localePath('/dashboard'))
}

useSeoPage({
  title: () => 'Onboarding',
  description: () => 'Configure your Nova business tenant environment.',
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>