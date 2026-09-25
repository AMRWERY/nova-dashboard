<template>
  <div class="p-6 sm:p-8 space-y-6 max-w-[1400px] mx-auto select-none">
    <!-- Top Banner Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-sora font-semibold text-[26px] sm:text-[28px] text-[var(--text-primary)] tracking-tight">
          Welcome back, Amr
        </h1>
        <div class="flex items-center gap-2 mt-1">
          <p class="font-jakarta text-[14px] text-[var(--text-secondary)]">Here's what's happening today.</p>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-plex text-[12px] text-[var(--text-muted)]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#3FCB8C] animate-pulse" />
            Live sync · 14s ago
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <VButton variant="secondary" size="md">
          <template #leading>
            <Icon name="lucide:download" class="w-4 h-4 text-[var(--text-secondary)]" />
          </template>
          Export report
        </VButton>
        <VButton variant="primary" size="md" accent="#E8A23D">
          New product
        </VButton>
      </div>
    </div>

    <!-- Top Grid: Revenue Chart + 2 KPI Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Revenue Today Main Card (2 Columns) -->
      <div
        class="lg:col-span-2 rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between relative overflow-hidden">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 font-jakarta text-[13px] text-[var(--text-secondary)]">
              <span>Revenue today</span>
              <Icon name="lucide:info" class="w-3.5 h-3.5 text-[var(--text-muted)] cursor-pointer" />
            </div>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8A23D]/10 border border-[#E8A23D]/20 font-plex text-[11px] font-medium text-[#E8A23D]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#E8A23D]" />
              Realtime
            </span>
          </div>

          <!-- Main Metric Row -->
          <div class="flex flex-wrap items-baseline gap-3 mt-3">
            <span class="font-sora font-bold text-[36px] sm:text-[40px] tracking-tight text-[var(--text-primary)]">
              $28,492.50
            </span>
            <span
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3FCB8C]/10 border border-[#3FCB8C]/20 font-plex text-[12px] font-medium text-[#3FCB8C]">
              <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
              +18.4% vs yesterday
            </span>
            <span class="font-plex text-[12px] text-[var(--text-muted)]">
              Target: $32,000.00 (89%)
            </span>
          </div>
        </div>

        <!-- SVG Curve Chart -->
        <div class="mt-6 relative h-40 w-full">
          <svg class="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#E8A23D" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#E8A23D" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            <!-- Area Fill -->
            <path d="M 0,90 C 80,85 140,75 220,60 C 300,45 360,70 440,30 L 500,20 L 500,120 L 0,120 Z"
              fill="url(#revenueGrad)" />
            <!-- Gradient Stroke Curve -->
            <path d="M 0,90 C 80,85 140,75 220,60 C 300,45 360,70 440,30 L 500,20" fill="none" stroke="#E8A23D"
              stroke-width="3" stroke-linecap="round" />
            <!-- Current Live Point Pulsing Indicator -->
            <circle cx="500" cy="20" r="4" fill="#E8A23D" />
            <circle cx="500" cy="20" r="8" fill="#E8A23D" fill-opacity="0.3" class="animate-ping" />
          </svg>
        </div>

        <!-- X-Axis Labels -->
        <div
          class="flex items-center justify-between font-plex text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
          <span>06:00</span>
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span class="font-medium text-[#E8A23D]">18:00 (now)</span>
        </div>
      </div>

      <!-- Right Column: 2 Stacked KPI Cards -->
      <div class="space-y-5 flex flex-col justify-between">
        <!-- Orders Today Card -->
        <div
          class="rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Orders today</span>
              <span
                class="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-muted)]">
                <Icon name="lucide:receipt" class="w-4 h-4" />
              </span>
            </div>
            <div class="flex items-baseline justify-between mt-2">
              <span class="font-sora font-bold text-[30px] text-[var(--text-primary)]">342</span>
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3FCB8C]/10 text-[#3FCB8C] font-plex text-[12px] font-medium">
                <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
                +12.1%
              </span>
            </div>
          </div>
          <div
            class="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] mt-3 font-jakarta text-[12px]">
            <span class="text-[var(--text-muted)]">Avg. order value</span>
            <span class="font-plex font-semibold text-[var(--text-primary)]">$83.31</span>
          </div>
        </div>

        <!-- Active Customers Card -->
        <div
          class="rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="font-jakarta text-[13px] text-[var(--text-secondary)]">Active customers</span>
              <span
                class="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-muted)]">
                <Icon name="lucide:users" class="w-4 h-4" />
              </span>
            </div>
            <div class="flex items-baseline justify-between mt-2">
              <span class="font-sora font-bold text-[30px] text-[var(--text-primary)]">1,894</span>
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3FCB8C]/10 text-[#3FCB8C] font-plex text-[12px] font-medium">
                <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
                +4.6%
              </span>
            </div>
          </div>
          <div
            class="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] mt-3 font-jakarta text-[12px]">
            <span class="flex items-center gap-1.5 text-[var(--text-muted)]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#E8A23D]" />
              Checkout sessions live
            </span>
            <span class="font-plex font-semibold text-[var(--text-primary)]">94</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Grid: Recent Activity + Sales Performance -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Recent Activity Card -->
      <div
        class="rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2">
              <h2 class="font-sora font-semibold text-[18px] text-[var(--text-primary)]">Recent activity</h2>
              <span
                class="px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-plex text-[11px] text-[var(--text-muted)]">
                Live
              </span>
            </div>
            <button type="button" class="font-jakarta text-[13px] text-[#E8A23D] hover:underline">
              View all
            </button>
          </div>

          <!-- Activity List -->
          <div class="space-y-4">

            <!-- Item 1 -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="w-9 h-9 rounded-lg bg-[#E8A23D]/10 text-[#E8A23D] grid place-items-center shrink-0">
                  <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                </span>
                <div>
                  <h4 class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">
                    Order #8492 placed by Marcus Vance
                  </h4>
                  <p class="font-jakarta text-[12px] text-[var(--text-muted)]">
                    Express fulfillment · 2 items
                  </p>
                </div>
              </div>
              <div class="text-end shrink-0">
                <span class="block font-plex font-semibold text-[14px] text-[var(--text-primary)]">$249.00</span>
                <span class="font-plex text-[12px] text-[var(--text-muted)]">2m ago</span>
              </div>
            </div>

            <!-- Item 2 -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="w-9 h-9 rounded-lg bg-[#E8A23D]/10 text-[#E8A23D] border border-[#E8A23D]/20 grid place-items-center shrink-0">
                  <Icon name="lucide:alert-triangle" class="w-4 h-4" />
                </span>
                <div>
                  <h4 class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">
                    Inventory threshold warning: Classic Woo...
                  </h4>
                  <p class="font-jakarta text-[12px] text-[var(--text-muted)]">
                    SKU: CW-891-BLK · 4 units left
                  </p>
                </div>
              </div>
              <div class="text-end shrink-0 flex flex-col items-end gap-1">
                <span
                  class="px-2 py-0.5 rounded bg-[#E8A23D]/10 text-[#E8A23D] border border-[#E8A23D]/20 font-plex text-[11px] font-medium">
                  Low stock
                </span>
                <span class="font-plex text-[12px] text-[var(--text-muted)]">14m ago</span>
              </div>
            </div>

            <!-- Item 3 -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] grid place-items-center shrink-0">
                  <Icon name="lucide:truck" class="w-4 h-4" />
                </span>
                <div>
                  <h4 class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">
                    Order #8491 shipped via FedEx Express
                  </h4>
                  <p class="font-jakarta text-[12px] text-[var(--text-muted)]">
                    Tracking #FX-92049182
                  </p>
                </div>
              </div>
              <div class="text-end shrink-0">
                <span class="block font-plex font-semibold text-[14px] text-[var(--text-primary)]">$118.50</span>
                <span class="font-plex text-[12px] text-[var(--text-muted)]">31m ago</span>
              </div>
            </div>

            <!-- Item 4 -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] grid place-items-center shrink-0">
                  <Icon name="lucide:user-plus" class="w-4 h-4" />
                </span>
                <div>
                  <h4 class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">
                    New customer registration: Sarah Jenk...
                  </h4>
                  <p class="font-jakarta text-[12px] text-[var(--text-muted)]">
                    Source: Organic search · US
                  </p>
                </div>
              </div>
              <div class="text-end shrink-0 flex flex-col items-end gap-1">
                <span
                  class="px-2 py-0.5 rounded bg-[#8B7CF6]/10 text-[#8B7CF6] border border-[#8B7CF6]/20 font-plex text-[11px] font-medium">
                  First purchase
                </span>
                <span class="font-plex text-[12px] text-[var(--text-muted)]">48m ago</span>
              </div>
            </div>

            <!-- Item 5 -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="w-9 h-9 rounded-lg bg-[#E8A23D]/10 text-[#E8A23D] grid place-items-center shrink-0">
                  <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                </span>
                <div>
                  <h4 class="font-sora font-semibold text-[14px] text-[var(--text-primary)]">
                    Order #8490 placed by David Chen
                  </h4>
                  <p class="font-jakarta text-[12px] text-[var(--text-muted)]">
                    Standard priority · 4 items
                  </p>
                </div>
              </div>
              <div class="text-end shrink-0">
                <span class="block font-plex font-semibold text-[14px] text-[var(--text-primary)]">$482.00</span>
                <span class="font-plex text-[12px] text-[var(--text-muted)]">1h ago</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer Audit Link -->
        <div
          class="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-6 font-plex text-[12px]">
          <span class="text-[var(--text-muted)]">5 of 128 events</span>
          <button type="button"
            class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1">
            <span>Audit log</span>
            <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Sales Performance Card -->
      <div
        class="rounded-[16px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between">
        <div>
          <!-- Header with Filter Pills -->
          <div class="flex items-center justify-between">
            <h2 class="font-sora font-semibold text-[18px] text-[var(--text-primary)]">
              Sales performance
            </h2>
            <div
              class="p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-1 font-plex text-[11px] text-[var(--text-muted)]">
              <button type="button"
                class="px-2 py-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]">USD</button>
              <button type="button" class="px-2 py-0.5 rounded bg-[#E8A23D] text-[#0A0C10] font-semibold">Today</button>
              <button type="button"
                class="px-2 py-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]">7d</button>
              <button type="button"
                class="px-2 py-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]">30d</button>
              <button type="button"
                class="px-2 py-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]">YTD</button>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-4 mt-4 font-plex text-[12px] text-[var(--text-muted)]">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#E8A23D]" />
              <span>Current period</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-0 border-b border-dashed border-[var(--text-muted)]" />
              <span>Previous period benchmark</span>
            </div>
          </div>

          <!-- Dual Line Chart SVG with Tooltip Overlay -->
          <div class="mt-6 relative h-48 w-full">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 500 140" preserveAspectRatio="none">
              <!-- Previous Period Dashed Benchmark Curve -->
              <path d="M 0,120 C 100,110 200,95 300,80 C 400,65 450,55 500,45" fill="none" stroke="#4E5666"
                stroke-width="2" stroke-dasharray="4 4" />

              <!-- Current Period Solid Glowing Amber Curve -->
              <path d="M 0,115 C 100,105 200,75 300,40 C 400,20 450,30 500,10" fill="none" stroke="#E8A23D"
                stroke-width="2.5" stroke-linecap="round" />

              <!-- Dashed Vertical Guideline at 14:00 (x=300) -->
              <line x1="300" y1="40" x2="300" y2="140" stroke="#E8A23D" stroke-opacity="0.4" stroke-dasharray="2 2" />
              <circle cx="300" cy="40" r="4" fill="#E8A23D" />
            </svg>

            <!-- Floating Tooltip Box at 14:00 -->
            <div
              class="absolute start-[54%] top-[12%] -translate-x-1/2 p-2.5 rounded-lg bg-[#12151B] border border-[var(--border-strong)] shadow-xl pointer-events-none select-none z-10 text-center">
              <p class="font-plex text-[11px] text-[var(--text-muted)]">14:00</p>
              <p class="font-sora font-bold text-[15px] text-[var(--text-primary)] mt-0.5">$24,180.00</p>
              <p class="font-plex text-[11px] text-[#3FCB8C] font-medium">+22% vs benchmark</p>
            </div>
          </div>

          <!-- X-Axis Labels -->
          <div
            class="flex items-center justify-between font-plex text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
            <span>08:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
            <span>16:00</span>
            <span>18:00</span>
          </div>
        </div>

        <!-- Footer Forecast Info -->
        <div
          class="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-6 font-plex text-[12px]">
          <div class="flex items-center gap-2 text-[var(--text-primary)] font-medium">
            <Icon name="lucide:trending-up" class="w-4 h-4 text-[#E8A23D]" />
            <span>Pacing: <strong class="text-[#3FCB8C]">+14.2%</strong> vs forecast</span>
          </div>
          <span class="text-[var(--text-muted)]">Updated real-time via Edge Engine</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeoPage({
  title: () => 'Nova Dashboard',
  description: () => 'Real-time telemetry and operational metrics for Apex Goods Co.',
})
</script>