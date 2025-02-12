import { onMounted, onBeforeUnmount } from 'vue';

export function useExternalStyle(cssHref: string) {
  let linkElement: HTMLLinkElement | null = null;

  const loadStyle = () => {
    linkElement = document.createElement('link');
    linkElement.href = cssHref;
    linkElement.rel = 'stylesheet';
    document.head.appendChild(linkElement);
  };

  const unloadStyle = () => {
    if (linkElement && linkElement.parentNode) {
      linkElement.parentNode.removeChild(linkElement);
    }
  };

  onMounted(() => {
    loadStyle();
  });

  onBeforeUnmount(() => {
    unloadStyle();
  });
}
