import Image from "next/image";
import { siFacebook, siGithub, siInstagram, siYoutube } from "simple-icons";
import Link from "next/link";
import Icon from "@/components/Icon";

export function Footer() {
  return (
    <footer className="w-full bg-surface-light text-text-muted-on-light text-sm py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image
                src="/sophia_light_bg.png"
                width={180}
                height={58}
                alt="Logo"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex items-center gap-6 mt-2">
              <Link
                href="https://facebook.com/Sophia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-link-on-light transition-colors"
              >
                <Icon icon={siFacebook} className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/Sophia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="hover:text-link-on-light transition-colors"
              >
                <Icon icon={siYoutube} className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/SophiaLT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-link-on-light transition-colors"
              >
                <Icon icon={siInstagram} className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/sophiasearch-2025/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-link-on-light transition-colors"
              >
                <Icon icon={siGithub} className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-foreground-on-light">Principal</p>
              <Link
                href="/news"
                className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors"
              >
                Catálogo
              </Link>

              <Link
                href="/plans"
                className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors"
              >
                Planes
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold text-foreground-on-light">Otros</p>
              <Link
                href="/admin"
                className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors whitespace-nowrap"
              >
                Acceso administrador
              </Link>

              <Link
                href="/privacy"
                className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors whitespace-nowrap"
              >
                Politica de privacidad
              </Link>

              <Link
                href="/terms"
                className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors whitespace-nowrap"
              >
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
