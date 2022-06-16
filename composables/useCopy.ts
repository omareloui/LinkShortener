import { useNotify } from "./useNotify";

export function useCopy() {
  const notify = useNotify();

  return async (text: string) => {
    function copyFromTextarea(input: string) {
      const textarea = document.createElement("textarea");
      textarea.value = input;

      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);

      return new Promise(res => {
        navigator.clipboard.writeText(textarea.value);
        textarea.remove();
        res(true);
      });
    }

    try {
      if (navigator.clipboard && window.isSecureContext)
        navigator.clipboard.writeText(text);
      else await copyFromTextarea(text);

      notify.success("Copied to clipboard.");
    } catch (e) {
      notify.error((e as Error).message, { duration: 10000 });
    }
  };
}
