import Image from "next/image";
import { siFacebook, siGithub, siInstagram, siYoutube } from "simple-icons";
import Link from "next/link";
import Icon from "@/components/Icon";

export function Footer() {
  return (
    <footer className="w-full bg-surface-light text-text-muted-on-light text-sm py-8 mt-12">
      <div className="container mx-auto flex flex-row justify-between">
        <div className="container mx-auto flex-col ">
          <div className="flex items-center gap-6">
            <Image
              src="/sophia_light_bg.png"
              width={330}
              alt="Logo"
              height={105}
            />
          </div>
          <div className="flex px-12 items-center gap-6">
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

        <div className="container mx-200 flex gap-32 flex-row ">
          <div className="container gap-4 mx-auto flex flex-col ">
            <p className="font-bold text-foreground-on-light">Principal</p>
            <Link href="/news">
              <button className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
                Catálogo
              </button>
            </Link>

            <Link href="/plans">
              <button className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
                Planes
              </button>
            </Link>
          </div>

          <div className="container gap-4 mx-auto flex flex-col whitespace-nowrap">
            <p className="font-bold text-foreground-on-light">Otros</p>

            <Link href="/admin">
              <button className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
                Acceso administrador
              </button>
            </Link>

            <Link href="/privacy">
              <button className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
                Politica de privacidad
              </button>
            </Link>

            <Link href="/terms">
              <button className="font-bold text-text-muted-on-light hover:text-link-on-light transition-colors">
                Términos y condiciones
              </button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
