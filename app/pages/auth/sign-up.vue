<template>
  <div class="contents">
    <!-- ── Left: form panel ─────────────────────────────────────────── -->
    <section class="relative flex flex-col px-6 sm:px-16 xl:px-28 py-8">

      <!-- Top row: brand + cluster badge -->
      <header class="flex items-center justify-between">
        <nuxt-link-locale to="/" class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-md grid place-items-center" :style="{ backgroundColor: accent }"
            aria-hidden="true">
            <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#0A0C10]" />
          </span>
          <span class="font-sora font-semibold text-[15px]">Nova</span>
          <span class="w-1 h-1 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          <span
            class="font-plex text-[12px] text-[var(--text-muted)] border-s border-[var(--border-subtle)] ps-3">v2.4.0</span>
        </nuxt-link-locale>

        <span
          class="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          <span class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)]">Secured cluster</span>
        </span>
      </header>

      <!-- Form -->
      <div class="flex-1 flex items-center">
        <form class="w-full max-w-[440px] mx-auto lg:mx-0" @submit="onSubmit">
          <h1 class="font-sora font-semibold text-[28px] leading-[34px]">Create your dashboard</h1>
          <p class="font-jakarta text-[14px] leading-[21px] text-[var(--text-secondary)] mt-3">
            Takes about a minute — no credit card.
          </p>

          <LazyVInput id="business-name" name="businessName" type="text" rules="required|min:2" label="Business name"
            placeholder="Acme Goods Co." autocomplete="organization" :accent="accent" class="mt-8" />

          <LazyVInput id="email" name="email" type="email" rules="required|email" label="Email address"
            placeholder="name@company.com" autocomplete="email" :accent="accent" class="mt-5" />

          <LazyVInput id="password" name="password" type="password" rules="required|min:8" label="Password"
            placeholder="••••••••" autocomplete="new-password" hint="At least 8 characters" :accent="accent"
            class="mt-5" />

          <LazyVButton type="submit" size="lg" block :accent="accent" class="mt-6">
            Create account
          </LazyVButton>

          <p class="text-center font-jakarta text-[13px] text-[var(--text-muted)] mt-6">
            Already have an account?
            <nuxt-link-locale to="/auth"
              class="font-medium text-[var(--text-primary)] hover:underline underline-offset-2">Sign
              in
            </nuxt-link-locale>
          </p>
        </form>
      </div>

      <!-- Footer -->
      <footer class="flex items-center justify-between font-plex text-[12px] text-[var(--text-muted)]">
        <span class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          System operational · 99.98%
        </span>
        <span>© Nova Systems</span>
      </footer>
    </section>

    <!-- ── Right: shared telemetry panel ────────────────────────────── -->
    <lazy-telemetry-panel />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const accent = '#E8A23D' // Retail tenant accent (§2.3)

const { handleSubmit } = useForm({
  initialValues: {
    businessName: '',
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit((values) => {
  console.log('Sign up form submitted:', values)
})

definePageMeta({
  layout: 'auth',
})

useSeoPage({
  title: () => 'Sign Up',
  description: () => 'Create your Nova Dashboard account.',
})
</script>