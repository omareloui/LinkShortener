export function useCopy() {
  return async (text: string | undefined) => {
    if (!text) return;
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
        document.execCommand("copy");
        textarea.remove();
        res(true);
      });
    }

    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text);
      else await copyFromTextarea(text);

      // TODO: remove this and notify instead
      console.log(`Copied ${text}`);
    } catch (e) {
      console.log("Something went wrong while copying, please try again later.");
    }
  };
}
