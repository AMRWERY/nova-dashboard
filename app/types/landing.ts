export interface BusinessType {
  id: string;
  label: string;
  /** Per-tenant accent hex (§2.3) — the ONLY color that changes between tenants */
  accent: string;
}
