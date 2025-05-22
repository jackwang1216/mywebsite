import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LastPage from "@/components/LastPage";
import Gallery from "@/components/Gallery";
import JackAI from "@/components/JackAI";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="border-t border-gold/10">
        <About />
      </div>
      <div className="border-t border-gold/10">
        <Projects />
      </div>
      <div className="border-t border-gold/10">
        <Contact />
      </div>
      <div className="border-t border-gold/10">
        <LastPage />
      </div>
      <div className="border-t border-gold/10">
        <Gallery />
      </div>
      <JackAI />
    </main>
  );
}
