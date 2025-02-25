import About from "@/components/About";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="border-t border-gold/10">
        <About />
      </div>
      <div className="border-t border-gold/10">
        <Projects />
      </div>
      <div className="border-t border-gold/10">
        <BlogPreview />
      </div>
      <div className="border-t border-gold/10">
        <Contact />
      </div>
    </div>
  );
}
