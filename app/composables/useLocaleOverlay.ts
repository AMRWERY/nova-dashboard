export const useLocaleOverlay = () => {
  const { isVisible, show, hide } = useOverlay();
  const targetLocale = useState<'en' | 'ar' | null>('locale-overlay-target', () => null);

  const { close } = useSidebar();

  const showOverlay = (target?: 'en' | 'ar') => {
    close();
    targetLocale.value = target ?? null;
    const msg = target === 'ar' 
      ? 'جاري التحويل إلى العربية...' 
      : target === 'en' 
        ? 'Switching to English...' 
        : undefined;
    show(msg);
  };

  const hideOverlay = (delay = 400) => {
    targetLocale.value = null;
    hide(delay);
  };

  return {
    isSwitching: isVisible,
    targetLocale,
    showOverlay,
    hideOverlay,
  };
};
