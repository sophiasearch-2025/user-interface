// Este componente limita visualmente el texto a un número fijo de líneas
// para cualquier etiqueta (as: Tag) (Por defecto <p>) que cumpla con el formato
export default function Clamp({
  as: Tag = "p",
  lines = 2,
  className = "",
  title,
  children,
}: {
  as?: any;                   // tipo de elemento React (p, span, h1, etc.)
  lines?: number;             // número de líneas visibles antes del recorte
  className?: string;         // clases personalizadas CSS
  title?: string;             // atributo "title" del elemento (texto al pasar el mouse)
  children: React.ReactNode;  // contenido a mostrar dentro del tag
}) {
  return (
    <Tag
      className={className}
      style={{
        display: "-webkit-box",             // usa modelo flexbox compatible con webkit
        WebkitLineClamp: lines,             // define el número máximo de líneas
        WebkitBoxOrient: "vertical" as any, // orienta el texto en columnas verticales
        overflow: "hidden",                 // oculta el texto que excede el límite
      }}
      title={title}                         // muestra tooltip al pasar el cursor
    >
      {children}
    </Tag>
  );
}