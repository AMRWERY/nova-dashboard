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

        <!-- Status badge -->
        <span
          class="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
          <span class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)]">Secured cluster</span>
        </span>
      </header>

      <!-- Form -->
      <div class="flex-1 flex items-center">
        <form class="w-full max-w-[440px] mx-auto lg:mx-0" @submit="onSubmit">
          <h1 class="font-sora font-semibold text-[28px] leading-[34px]">Sign in</h1>
          <p class="font-jakarta text-[14px] leading-[21px] text-[var(--text-secondary)] mt-3">
            Enter your credentials to access your control room.
          </p>

          <LazyVInput id="email" name="email" type="email" rules="required|email" label="Email address"
            placeholder="name@company.com" autocomplete="email" :accent="accent" class="mt-8" />

          <LazyVInput id="password" name="password" type="password" rules="required|min:8" label="Password"
            placeholder="••••••••" autocomplete="current-password" :accent="accent" class="mt-5">
            <template #label-extra>
              <nuxt-link-locale to="#"
                class="font-jakarta text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Forgot password?
              </nuxt-link-locale>
            </template>
          </LazyVInput>

          <LazyVButton type="submit" size="lg" block :accent="accent" class="mt-6">
            Sign in
          </LazyVButton>

          <p class="text-center font-jakarta text-[13px] text-[var(--text-muted)] mt-6">
            New to Nova?
            <nuxt-link-locale to="/auth/sign-up"
              class="font-medium text-[var(--text-primary)] hover:underline underline-offset-2">Create
              an
              account</nuxt-link-locale>
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

    <!-- ── Right: telemetry showcase panel ──────────────────────────── -->
    <lazy-telemetry-panel />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const accent = '#E8A23D'

const { handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit((values) => {
  console.log('Sign in form submitted:', values)
})

definePageMeta({
  layout: 'auth',
})

useSeoPage({
  title: () => 'Sign In',
  description: () => 'Sign in to your Nova Dashboard.',
})
</script>