import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="container relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1"></main>
      <Footer />
    </div>
  );
}
