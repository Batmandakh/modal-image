import { useRef, useState, useCallback } from "react";

/**
 * Reusable React Autohide generic hook generated with ChatGPT
 * this hook can be used on everything which needs autohide functionality
 *
 * @param delay
 * @returns
 */
export const useAutohide = (delay = 1000) => {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(visible);
  const delayRef = useRef(delay);
  const startRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);
  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, []);
  const setVisibleSync = useCallback((value: boolean) => {
    value ? startTimer() : clearTimer();
    visibleRef.current = value;
    setVisible(value);
    delayRef.current = delay;
  }, [delay]);
  const startTimer = useCallback(() => {
    clearTimer();
    startRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setVisibleSync(false);
      timeoutRef.current = null;
    }, delayRef.current);
  }, [delayRef.current]);
  const toggle = useCallback(() => {
    setVisibleSync(!visibleRef.current);
  }, []);
  const show = useCallback(() => {
    setVisibleSync(true);
  }, []);
  const hide = useCallback(() => {
    setVisibleSync(false);
  }, []);
  const pause = useCallback(() => {
    if (timeoutRef.current !== null) {
      const elapsed = startRef.current ? Date.now() - startRef.current : 0;
      delayRef.current = Math.max(delayRef.current - elapsed, 0);
      clearTimer();
    };
  }, []);
  const resume = useCallback(() => {
    if (visibleRef.current && delayRef.current > 0 && timeoutRef.current === null) {
      startTimer();
    }
  }, [startTimer]);
  const still = useCallback(() => {
    show();
    pause();
  }, []);
  const toggleStill = useCallback(() => {
    toggle();
    visibleRef.current && pause();
  }, [visible]);

  return { visible: visibleRef.current, show, hide, pause, resume, toggle, still, toggleStill};
};

/**
 * Example
 *
 * const tooltip = useAutohide(3000);
 *
 * return (<>
 *      {tooltip.visible && (
 *          <div>A tooltip which automatically hides</div>
 *      )}
 *      <button type='button' onClick={tooltip.show} >Show</button>
 *      <button type='button' onClick={tooltip.toggle} >Toggle</button>
 *      and
 *      <button type='button' onClick={tooltip.show('still')} >Show indefinitely</button>
 * </>);
 */
