import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { TAJAWAL_MEDIUM_BASE64 } from '../utils/constants';

export function usePrintPreview() {
  const ref = useRef();

  // Send print preview request to the Main process
  const handlePreview = function (target) {
    return new Promise(() => {
      const data = target.contentWindow.document.documentElement.outerHTML;
      const blob = new Blob([data], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      window.electronAPI.previewComponent(url, (response) => {});
    });
  };

  const onPreview = useReactToPrint({
    content: () => ref.current,
    documentTitle: 'Bill component',
    copyStyles: true,
    pageStyle: `
@font-face {
  font-family: 'Tajawal-Medium';
        src: url(data:font/ttf;base64,${TAJAWAL_MEDIUM_BASE64}) format('truetype');
}
    body {
      font-family: 'Tajawal-Medium';
    }
  `,
    print: handlePreview
  });
  return { ref, onPreview };
}
