import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-background min-h-screen flex-col flex justify-between">
      <Navbar />
      <Footer />
    </main>
  );
}
