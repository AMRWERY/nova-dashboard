<template>
  <div>
    <div class="p-6 sm:p-8 space-y-6 max-w-[1400px] mx-auto select-none">
      <!-- Top Banner Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-sora font-semibold text-[26px] sm:text-[28px] text-[var(--text-primary)] tracking-tight">
            Customers Page
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeoPage({
  title: () => 'Customers',
  description: () => 'Customers for Nova Dashboard',
})
</script>