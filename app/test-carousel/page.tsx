import { NoticeCardA, SectionHeadingLeft, Carousel} from "@/components";

export default function TestPage() {
  const notices = [
    {
      sourceName: "El Informador",
      dateISO: new Date("2025-11-05"),
      caption: "Por María González",
      title: "Descubren nueva especie marina en las profundidades del océano",
      description: "Científicos han identificado una criatura bioluminiscente que habita a más de 3000 metros de profundidad. Este hallazgo podría revolucionar nuestra comprensión de la vida en ambientes extremos.",
      ctaHref: "https://example.com/noticia-1",
    },
    {
      sourceName: "Tech Daily",
      dateISO: new Date("2025-11-07"),
      caption: "Por Carlos Rodríguez",
      title: "IA supera récord en diagnóstico médico temprano",
      description: "El nuevo sistema de inteligencia artificial logra una precisión del 98% en la detección precoz de enfermedades cardíacas.",
      ctaHref: "https://example.com/noticia-2",
    },
    {
      sourceName: "Deportes Hoy",
      dateISO: new Date("2025-11-08"),
      caption: "Por Ana Martínez",
      title: "Mundial 2026: Estadios listos para recibir aficionados",
      description: "Las sedes confirmaron que la infraestructura está al 95% de su capacidad operativa para el torneo más esperado del año.",
      ctaHref: "https://example.com/noticia-3",
    },
    {
      sourceName: "Ciencia Moderna",
      dateISO: new Date("2025-11-06"),
      caption: "Por Dr. Luis Fernández",
      title: "Avance significativo en energías renovables podría cambiar el futuro",
      description: "Investigadores desarrollan nuevas células solares con eficiencia récord del 47%, duplicando la capacidad de generación actual.",
      ctaHref: "https://example.com/noticia-4",
    },
    {
      logoSrc: "/logos/lt.png",
      coverSrc: "/covers/nota1.jpg",
      sourceName: "La Tercera",
      dateISO: "2024-05-11",
      caption: "Por Qué Pasa",
      title:
        "Fósiles chilenos aportan evidencia clave sobre cambios climáticos históricos",
      description:
        "Investigación de la U. Austral de Chile con múltiples autores y campañas de terreno.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/emol.png",
      coverSrc: "/covers/tecnologia.jpg",
      sourceName: "Emol",
      dateISO: "2024-11-03",
      caption: "Tecnología",
      title: "IA aplicada en diagnóstico clínico",
      description:
        "Hospitales chilenos integran flujos de IA para soporte de decisiones.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/cnn.png",
      coverSrc: "/covers/deportes.jpg",
      sourceName: "CNN Chile",
      dateISO: "2025-01-22",
      caption: "Deportes",
      title: "Nuevos modelos de rendimiento",
      description:
        "Análisis cuantitativo de cargas y recuperación en alto rendimiento.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/bbc.png",
      coverSrc: "/covers/ciencia.jpg",
      sourceName: "BBC Mundo",
      dateISO: "2025-02-10",
      caption: "Ciencia",
      title: "Telescopios y materia oscura",
      description:
        "Nuevas campañas observacionales refinan parámetros cosmológicos.",
      ctaHref: "#",
    },
  ];

  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeadingLeft 
          top="NoticeCard Autoresponsive" 
          bottom="Responsive distintos tamaños y relaciones de aspecto" 
        />
        <div className="mt-12 flex flex-row justify-center gap-8">
          <div className="flex flex-col items-center">  
            <p className="text-sm font-medium">Tamaño por defecto (330x440px - 3:4) [Demo ajustable]</p>
            <p className="text-sm font-medium">(Esquina inferior derecha para arrastrar)</p>
            <NoticeCardA {...notices[0]} resizable={true}/>
          </div>
        </div>
        <div className="mt-12 flex flex-row gap-8">
          <SectionHeadingLeft 
            top="Carrusel de componentes" 
            bottom="Para usar principalmente con NoticeCard" 
          />
        </div>
        <div className="mt-12 flex flex-row justify-center gap-8">
          <section>
            <Carousel
              items={notices}
              render="NoticeCardA"
              maxWidth="80vw" //Ancho relativo: 80% de la pantalla
            />
          </section>
        </div>
      </div>
    </main>
  );
}