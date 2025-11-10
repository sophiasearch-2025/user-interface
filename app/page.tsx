import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <div className="w-full flex justify-center">
        <Search />
      </div>
    </main>
  );
}
