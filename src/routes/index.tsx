import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, MapPin, Mail, Clock, Scissors } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg.asset.json";
import aboutImg from "@/assets/about-cut.jpg.asset.json";
import gTools from "@/assets/station-tools.jpg.asset.json";
import gScissor from "@/assets/scissor-cut.jpg.asset.json";
import gFade from "@/assets/fade-detail.jpg.asset.json";
import gClipper from "@/assets/clipper-trim.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

// Fictional contact details — this is a concept website.
const PHONE_DISPLAY = "0161 555 0142";
const PHONE_TEL = "+441615550142";
const WHATSAPP = "+441615550142";
const EMAIL = "hello@crownandbladebarbers.co.uk";
const ADDRESS_LINE1 = "42 Chandler Street";
const ADDRESS_LINE2 = "Northern Quarter, Manchester M4 1HQ";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  { name: "Haircut", price: "£28" },
  { name: "Skin Fade", price: "£32" },
  { name: "Cut & Beard", price: "£42" },
  { name: "Beard Trim", price: "£18" },
  { name: "Hot Towel Shave", price: "£30" },
  { name: "Junior Cut (under 12)", price: "£18" },
];

const GALLERY = [
  { src: gTools.url, alt: "Barber station and tools", pos: "center" },
  { src: gScissor.url, alt: "Scissor cut in progress", pos: "center" },
  { src: gFade.url, alt: "Close-up skin fade with clippers", pos: "center" },
  { src: gClipper.url, alt: "Clipper work at the chair", pos: "center 30%" },
  { src: heroImg.url, alt: "Barber shop interior with chairs", pos: "center" },
  { src: aboutImg.url, alt: "Barber shaping a client's hair", pos: "center 20%" },
];

const HOURS = [
  { day: "Mon", time: "Closed" },
  { day: "Tue – Wed", time: "9:00 – 18:00" },
  { day: "Thu – Fri", time: "9:00 – 20:00" },
  { day: "Saturday", time: "8:30 – 18:00" },
  { day: "Sunday", time: "10:00 – 16:00" },
];

function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} closeNav={closeNav} />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`flex items-center gap-2 ${className}`}
    >
      <Scissors className="h-4 w-4 text-primary" />
      <span className="font-display text-lg tracking-wide">
        Crown <span className="text-primary">&</span> Blade
      </span>
    </a>
  );
}

function Header({
  navOpen,
  setNavOpen,
  scrolled,
  closeNav,
}: {
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  scrolled: boolean;
  closeNav: () => void;
}) {
  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:py-5">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={
                n.href === "#top"
                  ? (e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  : undefined
              }
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-sm border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-transparent hover:text-primary transition-colors"
          >
            Book Appointment
          </a>
        </div>
        <button
          type="button"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-sm border border-border/70 p-2 text-foreground"
        >
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          navOpen ? "max-h-[500px]" : "max-h-0"
        } bg-background border-b border-border/60`}
      >
        <div className="flex flex-col px-5 py-4 gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => {
                if (n.href === "#top") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                closeNav();
              }}
              className="py-3 text-base text-foreground/90 hover:text-primary border-b border-border/40"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeNav}
            className="mt-4 inline-flex items-center justify-center rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            Book Appointment
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={closeNav}
            className="inline-flex items-center justify-center rounded-sm border border-border px-4 py-3 text-sm text-foreground"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      <img
        src={heroImg.url}
        alt="Interior of Crown & Blade barbershop"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center" }}
        width={1600}
        height={1008}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_55%,transparent)_0%,color-mix(in_oklab,var(--background)_35%,transparent)_45%,color-mix(in_oklab,var(--background)_85%,transparent)_100%)]" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Proper cuts.<br />
            <span className="text-foreground/85">Traditional barbering with </span>
            <span className="italic text-primary">modern precision.</span>
          </h1>
          <p className="mt-8 max-w-lg text-base text-foreground/70 md:text-lg">
            Quality haircuts, beard trims and hot towel shaves in a relaxed, professional environment.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center rounded-sm border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View Prices
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, center = false }: { eyebrow: string; title: React.ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Photo({ src, alt, className = "", pos = "center" }: { src: string; alt: string; className?: string; pos?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-card/50 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ objectPosition: pos }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-28 md:scroll-mt-32 py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Services"
          title={<>Prices.</>}
        />
        <div className="mt-14 grid gap-x-16 gap-y-0 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.name} className="flex items-baseline justify-between gap-6 border-b border-border/40 py-6">
              <h3 className="font-display text-lg">{s.name}</h3>
              <span className="font-display text-lg text-primary">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-28 md:scroll-mt-32 border-t border-border/50 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            Craft & Precision
          </h2>
          <div className="mt-8 space-y-5 text-foreground/70 leading-relaxed">
            <p>
              Every haircut is tailored to the client. Whether you’re after a sharp skin fade, a
              classic scissor cut or a beard tidy-up. We make sure you leave looking your best.
            </p>
          </div>
        </div>
        <Photo src={aboutImg.url} alt="Barber cutting a client's hair" className="aspect-[4/5]" pos="center 25%" />
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-28 md:scroll-mt-32 border-t border-border/50 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Gallery" title={<>Gallery</>} />
        <div className="mt-14 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:aspect-[2/1]">
          <Photo
            src={GALLERY[0].src}
            alt={GALLERY[0].alt}
            pos={GALLERY[0].pos}
            className="aspect-[4/5] md:aspect-auto md:row-span-2 md:col-span-2"
          />
          {GALLERY.slice(1, 5).map((it) => (
            <Photo
              key={it.alt}
              src={it.src}
              alt={it.alt}
              pos={it.pos}
              className="aspect-square md:aspect-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const waLink = `https://wa.me/${WHATSAPP.replace(/[^\d]/g, "")}?text=${encodeURIComponent("Hi Crown & Blade, I'd like to book an appointment.")}`;
  return (
    <section id="contact" className="scroll-mt-28 md:scroll-mt-32 border-t border-border/50 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title={<>Visit the shop.</>} />
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <h3 className="text-xs uppercase tracking-[0.28em] text-foreground/60">Opening Hours</h3>
              </div>
              <ul className="mt-5 divide-y divide-border/40">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-foreground/85">{h.day}</span>
                    <span className={h.time === "Closed" ? "text-foreground/40" : "text-foreground"}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                <h3 className="text-xs uppercase tracking-[0.28em] text-foreground/60">Find Us</h3>
              </div>
              <address className="mt-5 not-italic text-sm text-foreground/85 leading-relaxed">
                {ADDRESS_LINE1}<br />
                {ADDRESS_LINE2}
              </address>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 text-primary" /> {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 text-foreground/85 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 text-primary" /> {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <iframe
              title="Map to Crown & Blade Barbers"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE1 + ", " + ADDRESS_LINE2)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[420px] w-full border border-border/50 grayscale contrast-110 aspect-[4/5] md:aspect-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 pb-28 pt-10 md:pb-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs text-foreground/45">
          Concept website designed by Dalirron Digital. This is not a real business.
        </p>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur">
      <div className="grid grid-cols-3 gap-px">
        <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 py-3 text-sm text-foreground">
          <Phone className="h-4 w-4 text-primary" /> Call
        </a>
        <a
          href={`https://wa.me/${WHATSAPP.replace(/[^\d]/g, "")}?text=${encodeURIComponent("Hi Crown & Blade, I'd like to book an appointment.")}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-sm text-foreground border-x border-border/60"
        >
          <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 bg-primary py-3 text-sm font-medium text-primary-foreground">
          Book
        </a>
      </div>
    </div>
  );
}
