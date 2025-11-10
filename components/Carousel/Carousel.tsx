"use client";

import { useCarouselScroll } from "./useCarouselScroll";
import { CarouselControls } from "./CarouselControls";

import styles from "./Carousel.module.css";
import NoticeCardA from "@/components/NoticeCards/NoticeCardA";

import React from "react";

export type CarouselItem = Record<string, any>;

type Props<T = CarouselItem> = {
  title?: string;
  items: T[];
  step?: number;
  className?: string;
  render?: "NoticeCardA";
  scale?: number;
  maxWidth?: string; // Ancho máximo del carousel (ej: "1200px", "80vw", "50rem")
};

const RENDERERS = {
  NoticeCardA: NoticeCardA,
} as const;

export default function Carousel<T = CarouselItem>({
  title = "Carrusel",
  items,
  className = "",
  step,
  render = "NoticeCardA",
  scale = 1,
  maxWidth = "100%", // Por defecto usa todo el ancho disponible
}: Props<T>) {
  const { trackRef, isReady, hasOverflow, atStart, atEnd, scrollByStep } =
    useCarouselScroll();

  const itemsLength = items.length;

  React.useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current as HTMLDivElement;

    const measureOnce = () => {
      const cards = track.querySelectorAll(`.${styles["item"]} > *`);
      if (!cards.length) return;

      let maxH = 0;
      cards.forEach(el => { maxH = Math.max(maxH, (el as HTMLElement).scrollHeight); });

      if (maxH > 0) {
        track.style.setProperty("--card-h", `${Math.ceil(maxH)}px`);
      }
    };

    const images = track.querySelectorAll('img');
    if (!images.length){ setTimeout(measureOnce, 50); return; }

    let loaded = 0;
    const total = images.length;
    const done = () => { if(++loaded === total) setTimeout(measureOnce, 50); };

    images.forEach(img => {
      if (img.complete) done();
      else { img.addEventListener('load', done, {once:true}); img.addEventListener('error', done, {once:true}); }
    });
  }, [itemsLength]);

  if (!items?.length) return null;
  const Renderer = RENDERERS[render];

  return (
    <section 
      className={`relative mx-auto ${className}`}
      style={{ 
        maxWidth,
        marginLeft: maxWidth !== "100%" ? "auto" : undefined,
        marginRight: maxWidth !== "100%" ? "auto" : undefined,
      }}
    >
      <div
        ref={trackRef}
        className={`${styles["track"]} ${!hasOverflow ? styles["centered"] : ""}`}
        style={{ ["--scale" as any]: scale }}
      >
        {items.map((it, idx) => (
          <div key={idx} className={styles["item"]}>
            <NoticeCardA {...(it as any)} />
          </div>
        ))}
      </div>

      <CarouselControls
        isReady={isReady}
        hasOverflow={hasOverflow}
        atStart={atStart}
        atEnd={atEnd}
        onPrevious={() => scrollByStep(-1, step)}
        onNext={() => scrollByStep(1, step)}
        scale={scale}
      />
    </section>
  );
}