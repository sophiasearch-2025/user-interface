import Image from "next/image";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-light text-text-muted-on-light text-sm py-8 mt-12">
      <div className="container mx-auto flex flex-row justify-between">
        <div className="container mx-auto flex-col ">
          <div className="flex items-center gap-6">
            <Image src="/sophia_light_bg.png" width={330} alt="Logo" height={105} />
          </div>
          <div className="flex px-12 items-center gap-6">
            <a
              href="https://facebook.com/Sophia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-link-on-light transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/Sophia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin"
              className="hover:text-link-on-light transition-colors"
            >
              <Linkedin className="h-5 -w-5" />
            </a>
            <a
              href="https://youtube.com/Sophia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="hover:text-link-on-light transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/SophiaLT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-link-on-light transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Sophia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-link-on-light transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="container mx-200 flex gap-32 flex-row ">
          <div className="container gap-4 mx-auto flex flex-col ">
            <p className="font-bold text-foreground-on-light">Principal</p>
            <a href="#" className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
              Catalogo
            </a>
            <a href="#" className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
              Planes
            </a>
          </div>

          <div className="container gap-4 mx-auto flex flex-col whitespace-nowrap">
            <p className="font-bold text-foreground-on-light">Otros</p>

            <a href="#" className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
              Acceso administrador
            </a>
            <a href="#" className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
              Politica de privacidad
            </a>
            <a href="#" className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
