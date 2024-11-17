import { useEffect, useRef } from 'react';

/**
 *
 * @param {*} handler // to be able to call handler when detects click outside
 * @param {*} listenCapturing // to call handleClick on the capture phase or in the bubble phase
 * @returns {*} ref //  to be able to select the element to check for click event inside or outside
 */
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  const timeoutRef = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        const el = document.querySelector('.MuiPickersLayout-contentWrapper') ?? null;

        if (ref.current && !ref.current.contains(e.target) && !el?.contains(e.target)) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            // console.log('cloosing');
            handler();
          }, 0);
        }
      }
      document.addEventListener('click', handleClick, listenCapturing);

      return () => {
        document.removeEventListener('click', handleClick, listenCapturing);
        clearTimeout(timeoutRef.current);
      };
    },
    [handler, listenCapturing]
  );

  return { ref };
}
