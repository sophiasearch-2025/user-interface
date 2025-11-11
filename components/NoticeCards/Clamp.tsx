"use client";
import { useLayoutEffect, useRef, useState } from "react";

// Componente Clamp inteligente que ajusta el espacio al contenido real
function Clamp({
  as: Tag = "p",
  maxLines = 2,
  className = "",
  title,
  children,
}: {
  as?: any;
  maxLines?: number;
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const elementRef = useRef<HTMLElement>(null);
  const [needsClamp, setNeedsClamp] = useState(false);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const checkClampNeed = () => {
      // Calcular cuántas líneas ocupa el contenido
      const { scrollHeight, clientHeight } = element;
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const actualLines = Math.ceil(scrollHeight / lineHeight);
      
      setNeedsClamp(actualLines > maxLines);
    };

    // Usar requestAnimationFrame para evitar múltiples re-renderizados
    const scheduleCheck = () => {
      requestAnimationFrame(checkClampNeed);
    };

    // Observar cambios en el elemento
    const observer = new ResizeObserver(scheduleCheck);
    observer.observe(element);

    // Verificación inicial
    scheduleCheck();

    return () => {
      observer.disconnect();
    };
  }, [children, maxLines]);

  return (
    <Tag
      ref={elementRef}
      className={className}
      style={{
        // Altura dinámica basada en el contenido real
        height: needsClamp ? undefined : "auto",
        // Line-clamp solo cuando es necesario
        ...(needsClamp ? {
          display: "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical" as any,
          overflow: "hidden",
        } : {
          overflow: "visible",
        }),
      }}
      title={needsClamp ? title : undefined}
    >
      {children}
    </Tag>
  );
}

export default Clamp;