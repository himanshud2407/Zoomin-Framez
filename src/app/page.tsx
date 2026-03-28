"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MenuOverlay } from "@/components/MenuOverlay";
import { ContactModal } from "@/components/ContactModal";
import { PhotoAlbums } from "@/components/PhotoAlbums";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30; // Max movement 30px
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <>
      {/* Menu & Contact Overlays */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 transition-all">
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[#E7EFF2] hover:text-white transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">menu</span>
            </div>
            {/* Menu text removed per user request */}
          </button>
        </div>

        <div className="flex-1 flex justify-center text-center">
          <Link
            href="#"
            className="flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Image
              src="/photo/logo.png"
              alt="Zoomin Framez Logo"
              width={100}
              height={100}
              className=""
            />
            <span className="sr-only">ZOOMIN FRAMEZ</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setIsContactOpen(true)}
            className="font-label tracking-widest uppercase text-[10px] md:text-xs text-[#161407] font-bold bg-[#E9E2CD] px-6 py-3 md:px-8 md:py-3 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg shadow-white/5"
          >
            Book Now
          </button>
        </div>
      </nav>

      <main className="relative">
        {/* Parallax Hero Section */}
        <section
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
        >
          <motion.div
            className="absolute inset-0 z-0 origin-center scale-[1.15]"
            style={{
              x: mousePos.x * -1,
              y: mousePos.y * -1,
            }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ y: backgroundY }}
            >
              <Image
                src="/photo/Photo (214).JPG"
                alt="Zoomin Framez Hero Background"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 mix-blend-multiply"></div>
            </motion.div>
          </motion.div>

          {/* Midground Layer (Text & CTA) */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
            style={{ y: textY }}
          >
            <h1 className="font-headline font-extrabold text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter text-[#E9E2CD] mb-8 drop-shadow-2xl">
              CAPTURING
              <br />
              REALITY
            </h1>
            <Link
              href="/portfolio"
              className="bg-[#161407]/40 border border-[#E9E2CD]/30 text-[#E9E2CD] font-label px-8 py-4 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#E9E2CD] hover:text-[#161407] transition-all backdrop-blur-md inline-block"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Foreground Layer (Human) */}
          {/* <motion.div
            className="absolute inset-0 z-20 pointer-events-none origin-bottom scale-105"
            style={{
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5
            }}
          >
            <motion.div className="w-full h-full relative" style={{ y: foregroundY }}>
              <Image
                src="/fore.png"
                alt="Foreground Layer"
                fill
                className="object-bottom object-[center_bottom] object-contain md:object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>
          </motion.div> */}

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-[#E9E2CD]/60 font-bold">
                Scroll
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#E9E2CD]/60 to-transparent"></div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid (Asymmetric) */}
        <section id="portfolio" className="py-32 px-6 md:px-12 bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="/photo/Photo (41).jpg"
                alt="Portrait project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Elegance Defined
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Collections 2024
                </p>
              </div>
            </div>

            {/* Card 2 (Offset) */}
            <div className="relative aspect-[3/4] overflow-hidden group md:mt-16">
              <Image
                src="/photo/Photo (42).jpg"
                alt="Lifestyle project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Urban Soul
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Street Series
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="/photo/Photo (48).jpg"
                alt="Wedding project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Eternal Bliss
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Wedding Stories
                </p>
              </div>
            </div>

            {/* Card 4 (Offset) */}
            <div className="relative aspect-[3/4] overflow-hidden group md:mt-16">
              <Image
                src="/photo/Photo (50).jpg"
                alt="Creative project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Visual Poetry
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Artistic Vision
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="/photo/Photo (51).jpg"
                alt="Modern project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  The Glow
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Studio Work
                </p>
              </div>
            </div>

            {/* Card 6 (Offset) */}
            <div className="relative aspect-[3/4] overflow-hidden group md:mt-16">
              <Image
                src="/photo/Photo (53).jpg"
                alt="Nature project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Wild Spirit
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Outdoor Adventures
                </p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="/photo/Photo (54).JPG"
                alt="Lakeside project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Quiet Moments
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Cinematic Series
                </p>
              </div>
            </div>

            {/* Card 8 (Offset) */}
            <div className="relative aspect-[3/4] overflow-hidden group md:mt-16">
              <Image
                src="/photo/Photo (34).JPG"
                alt="Ocean project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent p-8 flex flex-col justify-end">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Vivid Deep
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  The Ocean Series
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Director Section */}
        <section className="relative py-32 px-6 md:px-12 bg-surface-container-low flex flex-col md:flex-row items-center gap-16 overflow-hidden">
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative max-w-md w-full aspect-[4/5]">
              <Image
                src="/photo/Hero.jpeg"
                alt="Creative Director Portrait"
                fill
                className="object-cover grayscale"
              />
              {/* Circular Badge */}
              <div className="absolute -top-12 -right-12 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                <svg
                  className="circular-badge w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      id="circlePath"
                    ></path>
                  </defs>
                  <text className="fill-primary font-label text-[8px] uppercase tracking-[0.3em]">
                    <textPath href="#circlePath">
                      Creative Director • Studio Head • Visual Storyteller
                      •{" "}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8 max-w-xl">
            <div className="font-label text-xs uppercase tracking-[0.4em] text-primary">
              About Zoomin Framez
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold leading-tight text-on-surface">
              Curating the digital frontier.
            </h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed">
              Zoomin Framez Photography & Films, based in Panchavati, Nashik, is
              a wedding photography and videography company founded in 2018.
              Known for their ability to blend casual and trendy styles, the
              team is dedicated to capturing the essence of each wedding. Their
              approach is centered on creating a beautiful narrative of your
              special day, ensuring every moment is preserve as a cherished
              memory.
            </p>
            <div className="pt-4" id="about">
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-4 group"
              >
                <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1">
                  Connect With Us
                </span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-32 px-6 md:px-12 bg-surface-container-lowest"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl space-y-4">
                <span className="font-label text-xs uppercase tracking-[0.4em] text-primary">
                  What we do
                </span>
                <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface">
                  Crafting Timeless <br />
                  <span className="text-on-surface-variant">Experiences.</span>
                </h2>
              </div>
              <p className="font-body text-on-surface-variant max-w-sm">
                From intimate portraits to grand cinematic wedding films, we
                offer a range of services tailored to capture your most precious
                moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service 1 */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-outline-variant/10 h-[450px] transition-all duration-500">
                <Image
                  src="/photo/Photo (1).JPG"
                  alt="Wedding Photography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E04] via-[#100E04]/60 to-transparent"></div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-white text-2xl">
                      photo_camera
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-white transition-colors">
                      Wedding <br /> Photography
                    </h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      Capturing timeless moments of love, joy, and every candid
                      detail of your special day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-outline-variant/10 h-[450px] md:mt-12 transition-all duration-500">
                <Image
                  src="/photo/Photo (54).JPG"
                  alt="Cinematography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E04] via-[#100E04]/60 to-transparent"></div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-white text-2xl">
                      videocam
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-white transition-colors">
                      Cinematography <br /> & Films
                    </h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      High-end cinematic films that tell your unique story with
                      emotional depth and visual flair.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-outline-variant/10 h-[450px] transition-all duration-500">
                <Image
                  src="/photo/Photo (226).jpg"
                  alt="Pre-Wedding"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E04] via-[#100E04]/60 to-transparent"></div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-white text-2xl">
                      favorite
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-white transition-colors">
                      Pre-Wedding <br /> Shoots
                    </h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      Romantic and stylish sessions in beautiful locations to
                      celebrate your journey together.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-outline-variant/10 h-[450px] md:mt-12 transition-all duration-500">
                <Image
                  src="/photo/Photo (60).jpg"
                  alt="Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E04] via-[#100E04]/60 to-transparent"></div>
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-white text-2xl">
                      person
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-white transition-colors">
                      Portrait & <br /> Fashion
                    </h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      Professional studio and outdoor portraits that capture
                      your personality and style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Photo Albums */}
        <PhotoAlbums />

        {/* Portfolio Teaser (Collage) */}
        <section
          id="collage"
          className="py-24 md:py-48 bg-[#0A0A0A] overflow-hidden relative"
        >
          <div className="container mx-auto px-6 relative h-[600px] md:h-[900px] flex items-center justify-center">
            {/* Desktop Background Decorative Text or something? No, keep it clean. */}

            {/* Collage Images */}
            {/* Image 1: Top Left */}
            <div className="absolute top-[5%] left-[5%] w-[40%] md:w-[25%] aspect-square z-10 rotate-[-6deg] shadow-2xl rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/photo/Photo (41).jpg"
                alt="Photography Action"
                fill
                sizes="(max-width: 768px) 40vw, 25vw"
                priority
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Image 2: Top Right */}
            <div className="absolute top-[8%] right-[5%] w-[45%] md:w-[30%] aspect-[4/5] z-0 rotate-[4deg] shadow-2xl rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/photo/Photo (42).jpg"
                alt="Cinematic Moment"
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                priority
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Image 3: Bottom Left */}
            <div className="absolute bottom-[10%] left-[8%] w-[42%] md:w-[22%] aspect-[3/4] z-20 rotate-[8deg] shadow-2xl rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/photo/Photo (5).jpg"
                alt="Artistic Detail"
                fill
                sizes="(max-width: 768px) 42vw, 22vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Image 4: Bottom Right */}
            <div className="absolute bottom-[5%] right-[2%] w-[38%] md:w-[28%] aspect-[4/3] z-10 rotate-[-10deg] shadow-2xl rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/photo/Photo (6).jpg"
                alt="Life in Frame"
                fill
                sizes="(max-width: 768px) 38vw, 28vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* View Portfolio Button Overlay */}
            <div className="relative z-30 group">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 group-hover:bg-white/30 transition-all duration-500"></div>
              <Link
                href="/portfolio"
                className="relative bg-white text-black px-10 py-5 md:px-14 md:py-7 rounded-full font-label text-[11px] md:text-sm uppercase tracking-[0.4em] font-bold hover:bg-[#E9E2CD] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] inline-block hover:scale-110 active:scale-95"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 md:py-40 px-6 md:px-12 bg-surface-container-lowest border-t border-outline-variant/10 text-center"
        >
          <div className="font-label text-xs uppercase tracking-[0.5em] text-on-surface-variant mb-8">
            Get In Touch
          </div>
          <a
            className="font-headline text-4xl md:text-7xl lg:text-[8vw] font-extrabold tracking-tighter text-primary hover:text-on-surface transition-colors break-all"
            href="mailto:zoominframez5831@gmail.com"
          >
            zoominframez5831@<br></br>gmail.com
          </a>
          <div className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-center gap-12 max-w-6xl mx-auto">
            <div className="text-left space-y-4">
              <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Social Channels
              </div>
              <div className="flex gap-8">
                <Link
                  className="font-label text-sm uppercase tracking-widest hover:text-primary transition-colors"
                  href="https://www.instagram.com/zoomin_framez_photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  className="font-label text-sm uppercase tracking-widest hover:text-primary transition-colors"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
                <Link
                  className="font-label text-sm uppercase tracking-widest hover:text-primary transition-colors"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Office
              </div>
              <p className="font-label text-sm uppercase tracking-widest">
                jalgaon / Nashik / Pune
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#100E04] w-full py-12 md:py-20 px-8 flex flex-col md:flex-row justify-between items-center md:items-end space-y-8">
        <div className="font-headline font-bold text-[#E9E2CD] text-2xl tracking-tighter text-center md:text-left flex items-center gap-4">
          <a href="/">
            <Image
              src="/photo/logo.png"
              alt="Zoomin Framez Logo"
              width={100}
              height={100}
              className=""
            />
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end gap-8">
          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-[#E9E2CD] text-[#161407] px-8 py-3 rounded-full font-label text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-white hover:scale-105 transition-all shadow-lg shadow-white/5"
          >
            Contact Us
          </button>
          <div className="flex gap-6">
            <Link
              className="font-label text-[10px] tracking-widest uppercase text-[#E9E2CD]/40 hover:text-[#E7EFF2] transition-all hover:translate-x-1"
              href="https://www.instagram.com/zoomin_framez_photography/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
            <Link
              className="font-label text-[10px] tracking-widest uppercase text-[#E9E2CD]/40 hover:text-[#E7EFF2] transition-all hover:translate-x-1"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </Link>
            <Link
              className="font-label text-[10px] tracking-widest uppercase text-[#E9E2CD]/40 hover:text-[#E7EFF2] transition-all hover:translate-x-1"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
            <Link
              className="font-label text-[10px] tracking-widest uppercase text-[#E9E2CD]/40 hover:text-[#E7EFF2] transition-all hover:translate-x-1"
              href="mailto:zoominframez5831@gmail.com"
            >
              Email
            </Link>
          </div>
          <div className="font-label text-[10px] tracking-widest uppercase text-[#E9E2CD]/40">
            © 2026 ZOOMIN FRAMEZ STUDIO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
