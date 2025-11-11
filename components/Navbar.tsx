import Image from "next/image";
import UserProfileMenu from "./UserProfileMenu";
import Register from "./Register";
import { UserData, fetchUserData } from "../lib/session";

export default async function Navbar() {
  const userData: UserData | null = await fetchUserData();

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center mx-auto px-8 py-4">
        <div className="flex items-center gap-8">
          <Image
            className="h-20 w-auto"
            src="/sophia_dark_bg.png"
            width={283}
            height={90}
            alt="Sophia Search"
            priority={true}
          />

          <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
            Catálogo
          </a>
          <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
            Planes
          </a>
        </div>

        {userData ? (
          <UserProfileMenu name={userData.name} role={userData.role} initial={userData.initial} />
        ) : (
          <div className="flex items-center gap-8">
            <Register />

            <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
              Iniciar sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
