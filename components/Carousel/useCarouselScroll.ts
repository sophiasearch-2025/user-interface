/*
Este hook fue íntegramente escrito por Claude, la IA.
Yo (Marco Delgado) solo copié y pegué como un campeón.

¿Entiendo cómo funciona? Absolutamente no.
¿Debería documentarlo? Probablemente.
¿Lo voy a hacer ahora? No, hay que avanzar.

Si esto explota, culpen a la IA.
Si funciona perfectamente, fui yo obviamente.
*/

"use client"; // Necesita de muchos hooks y eventos xd

import { useEffect, useRef, useState, useCallback } from "react";

function checkOverflow(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1;
}

function normalizeWheelDelta(e: WheelEvent, clientWidth: number): number {
  let delta = e.deltaY;
  if (e.deltaMode === 1) {
    delta *= 15; // líneas a píxeles
  } else if (e.deltaMode === 2) {
    delta *= clientWidth; // páginas
  }
  return delta;
}

function calculateScrollBounds(el: HTMLElement) {
  return {
    atStart: el.scrollLeft <= 1,
    atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
  };
}

function shouldConvertVerticalScroll(e: WheelEvent): boolean {
  return Math.abs(e.deltaY) > Math.abs(e.deltaX);
}

// Hook principal
export function useCarouselScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hasOverflowRef = useRef(false);
  const recalcTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const recalc = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    
    const overflow = checkOverflow(el);
    
    hasOverflowRef.current = overflow;
    setHasOverflow(overflow);
    setIsReady(true);
    
    if (!overflow) {
      setAtStart(true);
      setAtEnd(true);
    } else {
      const bounds = calculateScrollBounds(el);
      setAtStart(bounds.atStart);
      setAtEnd(bounds.atEnd);
    }
  }, []);

  const debouncedRecalc = useCallback(() => {
    if (recalcTimeoutRef.current) {
      clearTimeout(recalcTimeoutRef.current);
    }
    recalcTimeoutRef.current = setTimeout(recalc, 50);
  }, [recalc]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    recalc();
    const timer = setTimeout(recalc, 100);
    
    const onScroll = () => recalc();
    el.addEventListener("scroll", onScroll, { passive: true });
    
    const onWheel = (e: WheelEvent) => {
      if (!hasOverflowRef.current) return;
      
      if (shouldConvertVerticalScroll(e)) {
        e.preventDefault();
        
        const delta = normalizeWheelDelta(e, el.clientWidth);
        el.scrollLeft += delta;
      }
    };
    
    el.addEventListener("wheel", onWheel, { passive: false });
    
    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(el);
    
    const mutationObserver = new MutationObserver(debouncedRecalc);
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    const images = el.querySelectorAll('img');
    const onImageLoad = () => recalc();
    images.forEach(img => {
      if (img.complete) {
        recalc();
      } else {
        img.addEventListener('load', onImageLoad, { once: true });
      }
    });
    
    window.addEventListener("resize", recalc);
    
    return () => {
      clearTimeout(timer);
      if (recalcTimeoutRef.current) {
        clearTimeout(recalcTimeoutRef.current);
      }
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      images.forEach(img => img.removeEventListener('load', onImageLoad));
      window.removeEventListener("resize", recalc);
    };
  }, [recalc, debouncedRecalc]);

  const scrollByStep = useCallback((dir: 1 | -1, step?: number) => {
    const el = trackRef.current;
    if (!el) return;
    const px = step ?? Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir * px, behavior: "smooth" });
  }, []);

  return {
    trackRef,
    isReady,
    hasOverflow,
    atStart,
    atEnd,
    scrollByStep,
  };
}