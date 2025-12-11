"use client";

import { 
  ArrowUpRight, 
  Download, 
  Image as ImageIcon, 
  Sparkles, 
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Importar el hook de sesión simulada para la demostración de roles.
import { useMockSession } from "@/components/hooks/useMockSession";

// Definición de tipos para las noticias.
interface Noticia {
  id: string;
  fuente: string;
  fuenteLogo: string;
  categoria: string;
  fecha: string;
  titulo: string;
  bajada: string;
  contenido: string[];
  urlOriginal: string;
}

// Daros de simulacion
const mockNoticia1: Noticia = {
  id: "1",
  fuente: "La Tercera",
  fuenteLogo: "LT", 
  categoria: "Qué Pasa de La Tercera",
  fecha: "12 de mayo de 2023",
  titulo: "Fascinante estudio chileno descubre 370 mil fósiles que explica cómo se ha explotado la costa chilena",
  bajada: "Inédita investigación de la U. Austral de Chile que involucró a 15 personas y varios años de trabajo indagó sobre la variedad de especies en el litoral chileno para establecer cómo los humanos han explotado estos recursos.",
  contenido: [
    "¿Cuál ha sido la verdadera influencia de los humanos en la biodiversidad costera? es la pregunta que se hizo el estudio chileno titulado “El profundo impacto antropogénico en la biodiversidad bentónica del ecosistema marino de la Corriente de Humboldt”.",
    "Para llegar a esa respuesta, el paleontólogo de la Facultad de Ciencias de la Universidad Austral de Chile, Dr. Sven Nielsen, junto al investigador del CEAZA Marcelo Rivadeneira, diseñaron una línea base que une bibliografía actual con distintos registros paleontológicos.",
    "El estudio consideró el ecosistema marino de la corriente de Humboldt, que se extiende desde Chile hasta Ecuador, una de los más grandes y productivas del mundo.",
    "En terreno, los investigadores visitaron las terrazas marinas de las costas del sur del Perú y norte chileno, ricas en fósiles de moluscos marinos.",
    "En un trabajo que demandó el esfuerzo de unas 15 personas, finalmente se confirmó la presencia de casi de 370.000 fósiles pertenecientes a 164 especies de moluscos.",
    "Este nivel de detalle aportó a los cuatro aspectos principales que se consideraron para evaluar los posibles cambios en la diversidad actual.",
    "“Por un lado, el ecosistema que vimos en todo el Cuaternario es bastante estable en cuanto a composición de especies. Si lo comparamos con el periodo actual, la buena noticia es que no hemos perdido especies, pero sí hay un fuerte impacto en la abundancia de los recursos comestibles”, dijo Nielsen."
  ],
  urlOriginal: "https://www.latercera.com/"
};

const mockNoticia2: Noticia = {
  id: "2",
  fuente: "BioBioChile",
  fuenteLogo: "BB", 
  categoria: "Ciencia y Tecnología",
  fecha: "20 de noviembre de 2024",
  titulo: "Desde el desierto de Atacama: Astrónomos captan la imagen más nítida de una estrella en otra galaxia",
  bajada: "Utilizando el Very Large Telescope (VLT) del Observatorio Europeo Austral (ESO), un equipo internacional logró una resolución sin precedentes, revelando detalles nunca antes vistos de la estrella WOH G64 en la Gran Nube de Magallanes.",
  contenido: [
    "Un hito astronómico se ha registrado desde el norte de Chile. Investigadores han logrado capturar la imagen más detallada hasta la fecha de una estrella fuera de nuestra Vía Láctea, utilizando el interferómetro del Very Large Telescope (VLTI) en el Cerro Paranal.",
    "La estrella en cuestión, WOH G64, es una supergigante roja situada a unos 160.000 años luz de distancia. La imagen revela que la estrella está envuelta en una densa nube de gas y polvo, con una forma ovoide inesperada que desafía los modelos actuales de evolución estelar.",
    "“Por primera vez, hemos podido obtener una imagen ampliada de una estrella moribunda en una galaxia fuera de la nuestra”, explicó Keiichi Ohnaka, astrofísico de la Universidad Andrés Bello en Chile y líder del estudio publicado hoy.",
    "El descubrimiento es crucial porque las supergigantes rojas como WOH G64 están en las etapas finales de su vida antes de explotar como supernovas. Estudiar su pérdida de masa ayuda a comprender cómo estos colosos cósmicos enriquecen el universo con elementos pesados.",
    "Las nuevas observaciones sugieren que la estrella está perdiendo masa a un ritmo frenético, creando una envoltura de polvo que se extiende a años luz. Este material eventualmente formará la base para nuevas estrellas y sistemas planetarios."
  ],
  urlOriginal: "https://www.biobiochile.cl/"
};

const mockNoticia3: Noticia = {
  id: "3",
  fuente: "Emol",
  fuenteLogo: "EM", 
  categoria: "Tecnología y Sociedad",
  fecha: "05 de diciembre de 2024",
  titulo: "Inteligencia Artificial ayuda a predecir incendios forestales en la zona centro-sur con un 80% de precisión",
  bajada: "Un innovador proyecto piloto implementado por startups locales en conjunto con CONAF utiliza una red de sensores y algoritmos predictivos para alertar sobre posibles focos de incendio antes de que se vuelvan incontrolables.",
  contenido: [
    "La temporada de altas temperaturas en Chile trae consigo la amenaza constante de los incendios forestales. Sin embargo, este año la tecnología juega un rol protagónico en la prevención. Un nuevo sistema basado en Inteligencia Artificial (IA) ha comenzado a operar en las regiones del Maule y Biobío, logrando identificar zonas de riesgo con una tasa de acierto superior al 80%.",
    "El sistema procesa datos en tiempo real provenientes de satélites, estaciones meteorológicas y sensores terrestres que miden la humedad del suelo y la velocidad del viento. “Lo que hace el algoritmo es cruzar estas variables con el historial de incendios de los últimos 20 años para generar mapas de calor dinámicos”, explica Andrea Martínez, ingeniera informática líder del proyecto.",
    "Esta herramienta no solo predice dónde podría iniciarse el fuego, sino que también simula su posible comportamiento y dirección de propagación en las primeras horas, lo que permite a las brigadas de CONAF optimizar el despliegue de recursos y realizar cortafuegos preventivos de manera estratégica.",
    "El ministro de Agricultura destacó la iniciativa como un ejemplo de cómo la colaboración público-privada y el uso de tecnologías avanzadas pueden salvar vidas y proteger nuestros ecosistemas. Se espera que, tras la evaluación de esta temporada, el sistema se expanda a la Región de Valparaíso y la Araucanía para el próximo verano."
  ],
  urlOriginal: "https://www.emol.com/"
};

// --- BASE DE DATOS FALSA (Para buscar por ID) ---
const baseDeDatosMock: Noticia[] = [
  mockNoticia1,
  mockNoticia2,
  mockNoticia3
];

export default function NewsDetailPage() {
  const params = useParams(); 
  const { user, loginAs } = useMockSession(); // Usamos la sesión falsa para la demostración de roles.
  
  // params.id tendrá el valor "1", "2", etc.
  const noticia = baseDeDatosMock.find(n => n.id === params.id) || baseDeDatosMock[0];

  // Función para manejar el clic del botón de IA y aplicar la restricción C2.
  const handleChatClick = () => {
    // Criterio C2: "Un usuario demo recibe un mensaje de error si intenta usar IA".
    if (user?.role !== "premium") {
      alert("🔒 Función exclusiva para usuarios Premium.\nPor favor actualiza tu plan para chatear con la noticia.");
      return;
    }
    // Lógica para usuarios premium (o con acceso)
    alert("✨ Abriendo asistente IA para analizar esta noticia...");
    // Aquí iría la lógica real para abrir el chat o el modal de IA
  };

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      <main className="container mx-auto px-4 lg:px-8 py-8">
         
        {/* BOTONES DE CONTROL PARA LA DEMO */}
        <div className="fixed top-24 left-4 z-50 bg-black/80 p-2 rounded text-xs">
          <p className="mb-1 text-gray-400">DEMO CONTROLS:</p>
          <button onClick={() => loginAs("free")} className="block text-red-400 mb-1 hover:underline">Soy Free</button>
          <button onClick={() => loginAs("premium")} className="block text-green-400 hover:underline">Soy Premium</button>
        </div>

        {/* --- 1. ENCABEZADO --- */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Visualización <br />
              <span className="text-[#532ECE]">de noticia</span> 
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Aplicar la misma validación de clic en el botón IA del encabezado */}
            <button 
              onClick={handleChatClick}
              className="flex items-center gap-2 bg-[#27272A] border border-gray-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-80 transition"
            >
              Herramientas IA <Sparkles className="w-4 h-4 text-white" /> <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-[#FF6164] text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition">
              Imágenes <ImageIcon className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-[#46C5A5] text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition">
              Exportar a CSV <Download className="w-4 h-4" />
            </button>
            <Link href={noticia.urlOriginal} target="_blank" className="flex items-center gap-2 bg-[#532ECE] text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition">
              Ver original <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- 2. TARJETA DE NOTICIA --- */}
        <div className="relative bg-[#F2F2F2] text-black rounded-[2rem] p-8 lg:p-16 shadow-2xl max-w-6xl mx-auto">
           
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#A83232] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {noticia.fuenteLogo}
              </div>
              <div>
                <p className="font-bold text-lg leading-none mb-1">{noticia.fuente}</p>
                <p className="text-sm text-gray-500">{noticia.fecha}</p>
              </div>
            </div>
            <p className="text-gray-400 font-medium text-sm">{noticia.categoria}</p>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1D1D1B] mb-6 leading-tight">
            {noticia.titulo}
          </h2>
           
          <p className="text-lg text-[#1D1D1B] font-medium mb-10 leading-relaxed opacity-90">
            {noticia.bajada}
          </p>

          <div className="prose prose-lg max-w-none text-[#1D1D1B] opacity-80 space-y-6">
            {noticia.contenido.map((parrafo, index) => (
              <p key={index} className="leading-relaxed">{parrafo}</p>
            ))}
          </div>

          {/* Botón flotante para la T8 con validación C2 */}
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
             <button 
                onClick={handleChatClick}
                className={`${user?.role === 'premium' ? 'bg-[#2A3176]' : 'bg-gray-600'} text-white py-3 px-6 rounded-t-xl font-bold shadow-lg hover:bg-opacity-90 transition flex items-center gap-3 -rotate-90 origin-bottom-right translate-x-[40%]`}
              >
              {user?.role === 'premium' ? 'Conversar con IA' : 'IA Bloqueada'} 
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}