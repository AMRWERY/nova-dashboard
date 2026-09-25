import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0C10",
        surface: "#12151B",
        elevated: "#191D25",
        overlay: "#1F2430",
        "border-subtle": "#242933",
        "border-strong": "#333A48",
        "text-primary": "#EDEFF3",
        "text-secondary": "#98A1AF",
        "text-muted": "#5C6472",
        signal: "#5B7FFF",
        success: "#35C48C",
        warning: "#E8A23D",
        danger: "#F0556B",
        info: "#35B0C4",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"], // display/headings
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"], // UI/body
        plex: ['"IBM Plex Mono"', "monospace"], // data/numeric
      },
      borderRadius: {
        control: "8px", // buttons, inputs, badges
        panel: "14px", // cards, modals
      },
      boxShadow: {
        float:
          "0 12px 32px -8px rgba(0,0,0,.55), 0 2px 8px -2px rgba(0,0,0,.4)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-rtl"),
  ],
} satisfies Config;