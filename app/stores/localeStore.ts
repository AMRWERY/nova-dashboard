const LOCALE_STORAGE_KEY = "lexus-locale";

export const useLocaleStore = defineStore("locale", () => {
  const { locale, locales, setLocale } = useNuxtApp().$i18n;

  const currentLocale = computed(() => locale.value);

  const availableLocales = computed(() =>
    (locales.value as { code: string; name: string; dir: string }[]).filter(
      (l) => l.code !== locale.value
    )
  );

  const isRtl = computed(() => {
    const found = (locales.value as { code: string; dir: string }[]).find(
      (l) => l.code === locale.value
    );
    return found?.dir === "rtl";
  });

  // Write to localStorage whenever the i18n locale actually changes.
  // Using watch(locale) instead of useLocalStorage avoids Pinia SSR
  // hydration overwriting the ref before VueUse can read localStorage.
  watch(locale, (newLocale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  });

  // setLocale from @nuxtjs/i18n v10 handles both the locale switch
  // AND the navigation to the prefixed route — no manual router.push needed
  const switchLocale = async (code: string) => {
    const { showOverlay, hideOverlay } = useLocaleOverlay();
    showOverlay(code as "en" | "ar");
    try {
      await setLocale(code as "en" | "ar");
    } finally {
      hideOverlay(400);
    }
  }

  const toggleLocale = () => {
    switchLocale(locale.value === "en" ? "ar" : "en");
  }

  // Call in app.vue onMounted to restore saved preference on first visit
  const initFromStorage = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as "en" | "ar" | null;
    if (saved && saved !== locale.value) {
      switchLocale(saved);
    }
  }

  return {
    currentLocale,
    availableLocales,
    isRtl,
    switchLocale,
    toggleLocale,
    initFromStorage,
  };
});
