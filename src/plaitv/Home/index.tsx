import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <footer className="mt-auto text-quaternary font-semibold text-xs p-8 lg:p-12 flex items-center gap-12">
        <span> Plai.tv, all rights reserved.</span>
        <div className="flex items-center gap-5">
          <a
            href="https://persistent-trapezoid-f8e.notion.site/Terms-2da460759fb94278ad7d0346df4818c4"
            target="_blank"
          >
            Terms
          </a>
          <a
            href="https://persistent-trapezoid-f8e.notion.site/Privacy-f07e55c43fc7450287abbddca6d0fa35"
            target="_blank"
          >
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
