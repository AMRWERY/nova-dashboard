<template>
  <section
    class="relative hidden lg:flex flex-col justify-center px-16 xl:px-28 py-8 border-s border-[var(--border-subtle)] overflow-hidden"
    style="background-image: radial-gradient(var(--border-subtle) 1px, transparent 1px); background-size: 26px 26px;">
    <!-- Telemetry chips -->
    <div class="absolute top-8 end-8 flex items-center gap-3 font-plex text-[12px] text-[var(--text-muted)]">
      <span class="px-3 py-1.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
        CLUSTER <span class="text-[var(--text-primary)]">US-EAST-01</span>
      </span>
      <span class="px-3 py-1.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
        LATENCY <span class="text-[var(--text-primary)]">14ms</span>
      </span>
      <span class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
        REALTIME SYNC
      </span>
    </div>

    <!-- Data stream pill -->
    <div
      class="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] mb-12">
      <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
      <span class="font-plex text-[13px] text-[var(--text-secondary)]">Data stream</span>
      <span class="font-plex text-[13px] text-[var(--text-primary)]">84,290 eps</span>
    </div>

    <h2 class="font-sora font-semibold text-[36px] leading-[44px] max-w-[20ch]">
      Telemetry that adapts to the way you actually work.
    </h2>
    <p class="font-jakarta text-[14px] leading-[21px] text-[var(--text-secondary)] max-w-[52ch] mt-5">
      Nova configures metrics, pipelines, and terminology to your operational
      model the moment you sign in.
    </p>

    <!-- Pipeline topology card -->
    <div class="mt-10 max-w-[520px] rounded-[14px] bg-[var(--bg-elevated)]/90 border border-[var(--border-subtle)] p-5">
      <div class="flex items-center justify-between">
        <h3 class="font-sora font-semibold text-[16px] leading-[22px]">Active pipeline topology</h3>
        <span class="font-plex text-[13px]" :style="{ color: accent }">Live sync</span>
      </div>

      <div class="mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <div class="flex items-center justify-between font-jakarta text-[13px] text-[var(--text-secondary)]">
          <span>Pipeline throughput</span>
          <span class="font-plex text-[13px] text-[var(--text-primary)]">1.24 GB/s</span>
        </div>
        <div class="mt-2.5 h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
          <div class="h-full rounded-full w-[78%]" :style="{ backgroundColor: accent }" />
        </div>
        <div class="flex items-center justify-between font-plex text-[12px] text-[var(--text-muted)] mt-3">
          <span>Ingress: nominal</span>
          <span>Buffer utilization: 22%</span>
        </div>
      </div>
    </div>

    <!-- Business-type pill -->
    <div
      class="inline-flex items-center gap-2 mt-10 px-4 py-2 rounded-full bg-[var(--bg-elevated)]/90 border border-[var(--border-subtle)] self-start">
      <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
      <span class="font-plex text-[12px] text-[var(--text-muted)]">
        Retail · Food service · Real estate · Agency
      </span>
    </div>

    <!-- Footer -->
    <footer
      class="absolute bottom-8 start-16 end-16 xl:start-28 xl:end-28 flex items-center justify-between font-plex text-[12px] text-[var(--text-muted)]">
      <span>SESSION_ID 0x9F4C20A7B1</span>
      <span>INTEGRITY 100% · ZERO DROP</span>
    </footer>
  </section>
</template>

<script lang="ts" setup>
const accent = '#E8A23D' // Retail tenant accent (§2.3) — swap per tenant
</script>