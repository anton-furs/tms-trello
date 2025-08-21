class Reactive {
  constructor() {
    this.components = new Map();
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const removedNodes = new Set(mutation.removedNodes);
        this.components.forEach((cleanup, element) => {
          if (removedNodes.has(element) || [...removedNodes].some((node) => node.contains?.(element))) {
            cleanup();
            this.components.delete(element);
          }
        });
      });
    });

    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  register(element, cleanup) {
    this.components.set(element, cleanup);
  }
}

export const reactive = new Reactive();
