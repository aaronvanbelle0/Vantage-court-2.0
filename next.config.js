"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { BUSINESS, SERVICES } from "@/lib/business";
import { FAQS } from "@/lib/schema";

// ============================================================
// VANTAGE SPORT & SURFACE — Landing Page
// SEO-optimized, semantic HTML, modular sections.
// ============================================================

const COLORS = {
  obsidian: "#0A0A0B",
  vantageBlue: "#1E293B",
  slate: "#334155",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

const Reveal = ({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const MotionComp = motion(Component);
  return (
    <MotionComp
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </MotionComp>
  );
};

// ============================================================
// NAVBAR
// ============================================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Services", href: "#services" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1180px)]"
      role="banner"
    >
      <nav
        aria-label="Primary"
        className={`flex items-center justify-between px-6 md:px-8 py-3.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-black/60 border-white/10 backdrop-blur-2xl"
            : "bg-white/[0.03] border-white/[0.06] backdrop-blur-xl"
        }`}
      >
        <a href="#top" className="flex items-baseline gap-2" aria-label={`${BUSINESS.name} home`}>
          <span className="text-[11px] md:text-xs font-medium text-white tracking-[0.32em]">
            VANTAGE
          </span>
          <span className="text-[11px] md:text-xs text-white/40 tracking-[0.32em]" aria-hidden="true">
            &
          </span>
          <span className="text-[11px] md:text-xs font-medium text-white tracking-[0.32em]">
            SURFACE
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9" role="menubar">
          {links.map((l) => (
            <li key={l.label} role="none">
              <a
                href={l.href}
                role="menuitem"
                className="text-[11px] tracking-[0.22em] text-white/60 hover:text-white transition-colors duration-300 uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="text-[11px] tracking-[0.22em] uppercase px-4 py-2 rounded-full border border-white/15 text-white/90 hover:bg-white hover:text-black transition-all duration-400"
        >
          Inquire
        </a>
      </nav>
    </motion.header>
  );
};

// ============================================================
// HERO
// ============================================================
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ backgroundColor: COLORS.obsidian }}
    >
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30,41,59,0.6) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 100%, rgba(51,65,85,0.4) 0%, transparent 70%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.025]" />
      </div>

      <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-px bg-white/[0.04]" aria-hidden="true" />
      <div className="hidden lg:block absolute right-12 top-0 bottom-0 w-px bg-white/[0.04]" aria-hidden="true" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="flex items-center gap-3 mb-12 md:mb-20"
        >
          <span className="h-px w-8 bg-white/30" aria-hidden="true" />
          <span className="text-[10px] md:text-[11px] tracking-[0.4em] text-white/50 uppercase">
            Pacific Northwest · Est. {BUSINESS.founded}
          </span>
        </motion.div>

        <h1
          id="hero-heading"
          className="text-white font-light leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          {["The New Standard", "in Surface", "Engineering."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.0 }}
          className="mt-10 md:mt-14 max-w-md text-white/55 text-base md:text-lg leading-relaxed font-light"
        >
          Elite tennis, pickleball, and basketball court construction and
          resurfacing across Whatcom, Skagit, and the broader Pacific Northwest.
          Designed in {BUSINESS.address.city}, executed across the region.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          className="mt-14 flex flex-col sm:flex-row gap-5 sm:items-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-black text-[11px] tracking-[0.28em] uppercase rounded-full hover:bg-white/90 transition-all duration-400"
          >
            Request a Consultation
            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white/60 hover:text-white transition-colors duration-300 px-2"
          >
            View Selected Work
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.6 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase">Scroll</span>
        <div className="relative h-12 w-px bg-white/15 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white/70"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================
const SectionHeader = ({
  index,
  label,
  title,
  subtitle,
  headingId,
}: {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  headingId: string;
}) => (
  <div className="flex flex-col items-start gap-6 md:gap-8 mb-16 md:mb-24">
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-medium" aria-hidden="true">
          № {index}
        </span>
        <span className="h-px w-10 bg-white/20" aria-hidden="true" />
        <span className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-medium">
          {label}
        </span>
      </div>
    </Reveal>
    <Reveal delay={1}>
      <h2
        id={headingId}
        className="text-white font-light leading-[1.05] tracking-[-0.015em] max-w-3xl"
        style={{ fontSize: "clamp(1.875rem, 4.5vw, 3.5rem)" }}
      >
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={2}>
        <p className="text-white/50 text-base md:text-lg leading-relaxed font-light max-w-xl">
          {subtitle}
        </p>
      </Reveal>
    )}
  </div>
);

// ============================================================
// PROJECT GALLERY
// ============================================================
const PROJECTS = [
  {
    title: "Coastal Estate, Chuckanut",
    type: "Residential · Tennis Court",
    location: "Bellingham, WA",
    img: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1400&q=80",
    alt: "Private residential tennis court resurfacing project on a coastal estate near Bellingham, Washington",
    span: "tall",
  },
  {
    title: "Bellingham Athletic Complex",
    type: "Commercial · Multi-Court",
    location: "Bellingham, WA",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1400&q=80",
    alt: "Multi-court commercial sports facility with custom acrylic surfacing in Bellingham, Washington",
    span: "wide",
  },
  {
    title: "Skagit Private Residence",
    type: "Residential · Backyard Court",
    location: "Mount Vernon, WA",
    img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=80",
    alt: "Custom backyard sport court installation at a private residence in Skagit County, Washington",
    span: "regular",
  },
  {
    title: "Lynden Community Center",
    type: "Commercial · Basketball Court",
    location: "Lynden, WA",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
    alt: "Outdoor community basketball court with fresh acrylic resurfacing and striping in Lynden, Washington",
    span: "regular",
  },
  {
    title: "San Juan Retreat",
    type: "Residential · Custom Design",
    location: "San Juan Islands, WA",
    img: "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?auto=format&fit=crop&w=1400&q=80",
    alt: "Bespoke multi-sport court at a luxury retreat in the San Juan Islands, Washington",
    span: "tall",
  },
  {
    title: "Whatcom Sports Park",
    type: "Commercial · Pickleball Courts",
    location: "Ferndale, WA",
    img: "https://images.unsplash.com/photo-1626273024140-1ef9d1f06467?auto=format&fit=crop&w=1400&q=80",
    alt: "Newly constructed pickleball courts at a public sports park in Whatcom County, Washington",
    span: "wide",
  },
];

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[number]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const heightClass =
    project.span === "tall"
      ? "h-[560px] md:h-[640px]"
      : project.span === "wide"
      ? "h-[380px] md:h-[440px]"
      : "h-[440px] md:h-[500px]";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay: (index % 3) * 0.1 }}
      className={`group relative overflow-hidden ${heightClass}`}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.img}
          alt={project.alt}
          width={1400}
          height={project.span === "tall" ? 1800 : project.span === "wide" ? 1000 : 1300}
          loading={index < 3 ? "eager" : "lazy"}
          fetchPriority={index < 3 ? "high" : "auto"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          itemProp="image"
        />
      </div>

      <motion.div
        initial={{ y: "0%" }}
        animate={inView ? { y: "-101%" } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: (index % 3) * 0.1 + 0.1 }}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: COLORS.obsidian }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase" aria-hidden="true">
            № {String(index + 1).padStart(3, "0")}
          </span>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.3em] text-white/60 uppercase mb-2">
            <span itemProp="genre">{project.type}</span>
            <span className="mx-2">·</span>
            <span itemProp="locationCreated">{project.location}</span>
          </p>
          <h3 className="text-white text-xl md:text-2xl font-light tracking-tight" itemProp="name">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
};

const Gallery = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-32 md:py-48 px-6 md:px-12"
      style={{ backgroundColor: COLORS.obsidian }}
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          headingId="work-heading"
          index="002"
          label="Selected Work"
          title="Tennis, pickleball, and basketball courts engineered for permanence."
          subtitle="A curated selection of recent commissions across Whatcom, Skagit, and the San Juan Islands. Each surface is measured, mixed, and laid by hand."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PROCESS
// ============================================================
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Design",
    body: "Every project begins with site, sun, and intent. We assess drainage, dimensions, and orientation, then engineer a court specific to your property and use case before a single line is drawn.",
    detail: "Site survey · Spec drafting · Material selection",
  },
  {
    num: "02",
    title: "Prep",
    body: "The work nobody sees defines the work everyone notices. Sub-base evaluation, crack repair, and acrylic priming are executed to spec — the foundation of a court that lasts a decade or more.",
    detail: "Sub-base correction · Acrylic prime · Texture leveling",
  },
  {
    num: "03",
    title: "Precision",
    body: "Color is mixed to spec. Lines are pulled to the millimeter. The final coat is the signature — and we never sign work we couldn't stand on ourselves.",
    detail: "Color application · Line striping · Final inspection",
  },
];

const ProcessStep = ({ step, index }: { step: typeof PROCESS_STEPS[number]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.15 }}
      className="relative flex flex-col"
    >
      <motion.div
        className="h-px bg-white/30 origin-left mb-8 md:mb-12"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: index * 0.15 + 0.2 }}
        aria-hidden="true"
      />

      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">Step</span>
        <span
          className="text-white/90 font-light"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          aria-hidden="true"
        >
          {step.num}
        </span>
      </div>

      <h3
        className="text-white font-light tracking-[-0.01em] mb-6"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      >
        {step.title}
      </h3>

      <p className="text-white/55 text-base leading-relaxed font-light mb-8 max-w-sm">
        {step.body}
      </p>

      <p className="text-[11px] tracking-[0.25em] text-white/35 uppercase mt-auto">
        {step.detail}
      </p>
    </motion.article>
  );
};

const Process = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: COLORS.vantageBlue }}
    >
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(10,10,11,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        <SectionHeader
          headingId="process-heading"
          index="003"
          label="The Vantage Process"
          title="Three steps. No shortcuts."
          subtitle="Our approach is deliberate, documented, and uncompromising — refined over years of court construction work across the Pacific Northwest."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SERVICES (Bento)
// ============================================================
const Services = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-32 md:py-48 px-6 md:px-12"
      style={{ backgroundColor: COLORS.obsidian }}
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          headingId="services-heading"
          index="004"
          label="Services"
          title="Court construction & resurfacing across Northwest Washington."
          subtitle="From private estates to community athletic facilities, we deliver tennis, pickleball, basketball, and custom multi-sport surfaces with the same standard."
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              className="group relative overflow-hidden border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-500 p-8 md:p-10"
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="relative flex flex-col h-full min-h-[280px]">
                <div className="flex items-start justify-between mb-12 md:mb-16">
                  <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase" aria-hidden="true">
                    № {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/40 group-hover:text-white transition-colors duration-500" aria-hidden="true">
                    →
                  </span>
                </div>

                <h3
                  className="text-white font-light tracking-[-0.01em] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
                  itemProp="name"
                >
                  {s.name}
                </h3>

                <p
                  className="text-white/55 text-[15px] leading-relaxed font-light"
                  itemProp="description"
                >
                  {s.description}
                </p>

                <meta itemProp="serviceType" content={s.shortName} />
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Service area — important for local SEO */}
        <Reveal delay={1} className="mt-16 pt-12 border-t border-white/[0.06]">
          <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">
            Service Area
          </p>
          <p className="text-white/70 text-base font-light max-w-3xl leading-relaxed">
            Vantage Sport & Surface serves clients across Northwest Washington,
            including {BUSINESS.citiesServed.map((c) => c.name).join(", ")}, and
            surrounding communities throughout {BUSINESS.serviceArea.join(", ")}.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================
// FAQ — accordion with semantic <details>/<summary>
// ============================================================
const FAQ = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-32 md:py-48 px-6 md:px-12"
      style={{ backgroundColor: COLORS.obsidian }}
    >
      <div className="absolute top-0 left-12 right-12 h-px bg-white/[0.06]" aria-hidden="true" />

      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          headingId="faq-heading"
          index="005"
          label="Common Questions"
          title="What clients ask before they call."
          subtitle="Straight answers to the questions we hear most often about court construction, resurfacing, and project timelines in the Pacific Northwest."
        />

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={i * 0.5}>
              <details className="group py-8 md:py-10 cursor-pointer">
                <summary className="flex items-start justify-between gap-6 list-none">
                  <h3 className="text-white text-lg md:text-xl font-light tracking-[-0.01em] pr-4">
                    {item.q}
                  </h3>
                  <span
                    className="text-white/40 group-open:rotate-45 transition-transform duration-500 text-2xl font-extralight leading-none mt-1 shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-6 text-white/55 text-base leading-relaxed font-light max-w-3xl">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CONTACT
// ============================================================
const Field = ({
  label,
  type = "text",
  textarea = false,
  name,
  required = false,
  autoComplete,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  name: string;
  required?: boolean;
  autoComplete?: string;
}) => (
  <div className="group relative">
    <label htmlFor={name} className="block text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3">
      {label}
      {required && <span className="ml-1 text-white/30">*</span>}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        required={required}
        autoComplete={autoComplete}
        rows={4}
        className="w-full bg-transparent border-b border-white/15 focus:border-white/60 text-white text-base font-light pb-3 outline-none transition-colors duration-400 resize-none"
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-transparent border-b border-white/15 focus:border-white/60 text-white text-base font-light pb-3 outline-none transition-colors duration-400"
      />
    )}
  </div>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: COLORS.obsidian }}
    >
      <div className="absolute top-0 left-12 right-12 h-px bg-white/[0.06]" aria-hidden="true" />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <div className="flex items-center gap-3 mb-12">
                <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-medium" aria-hidden="true">
                  № 006
                </span>
                <span className="h-px w-10 bg-white/20" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-medium">
                  Contact
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2
                id="contact-heading"
                className="text-white font-light leading-[1.05] tracking-[-0.015em] mb-10"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)" }}
              >
                Begin with a conversation.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="text-white/55 text-base leading-relaxed font-light mb-12 max-w-sm">
                Tell us about the site and the vision. We respond to every
                inquiry within one business day.
              </p>
            </Reveal>

            <Reveal delay={3} className="mt-auto">
              <address className="not-italic space-y-5 pt-8 border-t border-white/[0.08]">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Phone
                  </p>
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="text-white/85 text-sm font-light hover:text-white transition-colors"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Email
                  </p>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-white/85 text-sm font-light hover:text-white transition-colors"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Studio
                  </p>
                  <p className="text-white/85 text-sm font-light">
                    {BUSINESS.address.city}, {BUSINESS.address.region} · By appointment
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Service Region
                  </p>
                  <p className="text-white/85 text-sm font-light">
                    {BUSINESS.serviceArea.map((c) => c.replace(" County", "")).join(" · ")}
                  </p>
                </div>
              </address>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={1}>
              <form onSubmit={handleSubmit} className="space-y-10" aria-label="Consultation request form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Field name="firstName" label="First Name" required autoComplete="given-name" />
                  <Field name="lastName" label="Last Name" required autoComplete="family-name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Field name="email" label="Email" type="email" required autoComplete="email" />
                  <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
                </div>
                <Field name="location" label="Project Location" autoComplete="address-level2" />
                <Field name="project" label="Tell us about the project" textarea required />

                <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <p className="text-[10px] tracking-[0.3em] text-white/35 uppercase">
                    All inquiries are confidential.
                  </p>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[11px] tracking-[0.28em] uppercase rounded-full hover:bg-white/90 transition-all duration-400 disabled:opacity-60"
                  >
                    {submitted ? "Received — thank you" : "Request a Consultation"}
                    {!submitted && <span className="inline-block transition-transform duration-400 group-hover:translate-x-1" aria-hidden="true">→</span>}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer
    className="relative px-6 md:px-12 py-12 border-t border-white/[0.06]"
    style={{ backgroundColor: COLORS.obsidian }}
    role="contentinfo"
  >
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-baseline gap-2">
        <span className="text-[11px] font-medium text-white tracking-[0.32em]">VANTAGE</span>
        <span className="text-[11px] text-white/40 tracking-[0.32em]" aria-hidden="true">&</span>
        <span className="text-[11px] font-medium text-white tracking-[0.32em]">SURFACE</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-[10px] tracking-[0.3em] text-white/40 uppercase">
        <span>{BUSINESS.address.city}, {BUSINESS.address.region}</span>
        <a href={`tel:${BUSINESS.phone}`} className="hover:text-white transition-colors">
          {BUSINESS.phoneDisplay}
        </a>
        <span>© {new Date().getFullYear()} {BUSINESS.legalName}</span>
      </div>
    </div>
  </footer>
);

// ============================================================
// ROOT
// ============================================================
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Gallery />
        <Process />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
