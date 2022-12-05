import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <footer className="mt-auto text-quaternary font-semibold text-xs p-8 lg:p-12">
        Plai.tv, all rights reserved.
      </footer>
    </div>
  );
}
