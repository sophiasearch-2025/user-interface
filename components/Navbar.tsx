import Image from "next/image";
import UserProfileMenu from "./UserProfileMenu";

async function fetchUserData() {
  return {
    name: "Usuario",
    role: "Rol del usuario",
    initial: "U",
  };
}

export default async function Navbar() {
  const userData = await fetchUserData();
  const isAuthenticated = !!userData;

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center mx-auto px-8 py-4">
        <div className="flex items-center gap-8">
          <Image src="/sophia_dark_bg.png" width={220} alt="Logo" height={70} />

          <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
            Catálogo
          </a>
          <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
            Planes
          </a>
        </div>

        {isAuthenticated ? (
          <UserProfileMenu userName={userData.name} userRole={userData.role} userInitial={userData.initial} />
        ) : (
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-bold bg-btn-primary-bg text-link-hover hover:bg-link-hover hover:text-btn-primary-bg border border-transparent hover:border-btn-primary-bg px-5 py-2 rounded-full transition-all"
            >
              Registrarse
            </a>

            <a href="#" className="font-bold text-link-active hover:text-link-hover transition-colors">
              Iniciar sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
