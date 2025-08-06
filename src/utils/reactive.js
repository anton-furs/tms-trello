class Reactive {
  constructor() {
    this.components = new Map();
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          this.components.forEach((cleanup, element) => {
            if (node === element || node.contains?.(element)) {
              cleanup();
              this.components.delete(element);
            }
          });
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
