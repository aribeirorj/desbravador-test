import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

/** Adia a chamada até passar `delay` ms sem novas chamadas. */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sempre chama a versão mais recente do callback, sem recriar o debounce.
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const cancel = useCallback(() => clearTimeout(timeoutRef.current), []);

  const run = useCallback(
    (...args: Args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay],
  );

  return { run, cancel };
}
