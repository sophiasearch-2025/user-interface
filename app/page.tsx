import { Carousel } from "@/components";
import Register from "@/components/Register";
import Search from "@/components/Search";

export default function Home() {
  const latestNews = [
    {
      sourceName: "El Informador",
      dateISO: new Date("2025-11-05"),
      caption: "Por María González",
      title: "Descubren nueva especie marina en las profundidades del océano",
      description:
        "Científicos han identificado una criatura bioluminiscente que habita a más de 3000 metros de profundidad. Este hallazgo podría revolucionar nuestra comprensión de la vida en ambientes extremos.",
      ctaHref: "https://example.com/noticia-1",
    },
    {
      sourceName: "Tech Daily",
      dateISO: new Date("2025-11-07"),
      caption: "Por Carlos Rodríguez",
      title: "IA supera récord en diagnóstico médico temprano",
      description:
        "El nuevo sistema de inteligencia artificial logra una precisión del 98% en la detección precoz de enfermedades cardíacas.",
      ctaHref: "https://example.com/noticia-2",
    },
    {
      sourceName: "Deportes Hoy",
      dateISO: new Date("2025-11-08"),
      caption: "Por Ana Martínez",
      title: "Mundial 2026: Estadios listos para recibir aficionados",
      description:
        "Las sedes confirmaron que la infraestructura está al 95% de su capacidad operativa para el torneo más esperado del año.",
      ctaHref: "https://example.com/noticia-3",
    },
    {
      sourceName: "Ciencia Moderna",
      dateISO: new Date("2025-11-06"),
      caption: "Por Dr. Luis Fernández",
      title: "Avance significativo en energías renovables podría cambiar el futuro",
      description:
        "Investigadores desarrollan nuevas células solares con eficiencia récord del 47%, duplicando la capacidad de generación actual.",
      ctaHref: "https://example.com/noticia-4",
    },
    {
      logoSrc: "/logos/lt.png",
      coverSrc: "/covers/nota1.jpg",
      sourceName: "La Tercera",
      dateISO: "2024-05-11",
      caption: "Por Qué Pasa",
      title: "Fósiles chilenos aportan evidencia clave sobre cambios climáticos históricos",
      description: "Investigación de la U. Austral de Chile con múltiples autores y campañas de terreno.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/emol.png",
      coverSrc: "/covers/tecnologia.jpg",
      sourceName: "Emol",
      dateISO: "2024-11-03",
      caption: "Tecnología",
      title: "IA aplicada en diagnóstico clínico",
      description: "Hospitales chilenos integran flujos de IA para soporte de decisiones.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/cnn.png",
      coverSrc: "/covers/deportes.jpg",
      sourceName: "CNN Chile",
      dateISO: "2025-01-22",
      caption: "Deportes",
      title: "Nuevos modelos de rendimiento",
      description: "Análisis cuantitativo de cargas y recuperación en alto rendimiento.",
      ctaHref: "#",
    },
    {
      logoSrc: "/logos/bbc.png",
      coverSrc: "/covers/ciencia.jpg",
      sourceName: "BBC Mundo",
      dateISO: "2025-02-10",
      caption: "Ciencia",
      title: "Telescopios y materia oscura",
      description: "Nuevas campañas observacionales refinan parámetros cosmológicos.",
      ctaHref: "#",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-10 gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="tracking-wider text-6xl font-bold">Todas tus noticias</h1>
          <h1 className="tracking-widest text-6xl font-bold text-text-accent">UNIFICADAS</h1>
        </div>

        <Search />

        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="text-xl font-medium">Descubre la magia de la IA aplicada a tus investigaciones.</h3>

          <div className="flex items-center justify-center gap-4">
            <Register />

            <button className="font-bold bg-btn-primary-hover-bg hover:bg-btn-primary-hover-bg/90 text-btn-primary-hover-text border border-btn-primary-bg px-5 py-2 rounded-full transition-colors">
              Comparar planes
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-5 bg-surface-accent"></div>
          <div className="flex flex-col items-baseline text-4xl ">
            <h2 className="font-bold text-text-primary">Últimas</h2>
            <h2 className="font-bold text-text-accent self-center">noticias añadidas</h2>
          </div>
        </div>

        <Carousel items={latestNews} render="NoticeCardA" maxWidth="95vw" />

        <div className="flex items-center justify-center">
          {" "}
          <a
            className="font-bold bg-btn-primary-bg hover:bg-btn-primary-bg/90 text-btn-primary-text px-5 py-2 rounded-full transition-colors"
            href="/news"
          >
            Ver catálogo completo
          </a>
        </div>
      </div>
    </div>
  );
}
