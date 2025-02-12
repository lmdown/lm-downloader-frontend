import { onMounted, onBeforeUnmount } from 'vue';

export function useExternalScript(jsSrc: string) {
  let scriptElement: HTMLScriptElement | null = null;

  const loadScript = () => {
    scriptElement = document.createElement('script');
    scriptElement.src = jsSrc;
    scriptElement.async = true;
    document.body.appendChild(scriptElement);
  };

  const unloadScript = () => {
    if (scriptElement && scriptElement.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }
  };

  onMounted(() => {
    loadScript();
  });

  onBeforeUnmount(() => {
    unloadScript();
  });
}
