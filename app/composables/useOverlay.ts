export const useOverlay = () => {
  const isVisible = useState<boolean>('global-overlay-visible', () => false);
  const message = useState<string | null>('global-overlay-message', () => null);

  const show = (msg?: string) => {
    message.value = msg ?? null;
    isVisible.value = true;
  };

  const hide = (delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        isVisible.value = false;
        message.value = null;
      }, delay);
    } else {
      isVisible.value = false;
      message.value = null;
    }
  };

  return {
    isVisible,
    message,
    show,
    hide,
    showOverlay: show,
    hideOverlay: hide,
    isSwitching: isVisible,
  };
};
