import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

// ── Noise overlay styles ──────────────────────────────────────────────────────
const noiseOverlaySvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;
const bgNoiseSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

const CREAM = "#E1E0CC";
const CREAM_PRIMARY = "#DEDBC8";

// ── WordsPullUp ───────────────────────────────────────────────────────────────
function WordsPullUp({ text, className = "", showAsterisk = false, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={{ gap: "0.25em" }}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} style={{ overflow: "hidden", display: "inline-flex" }}>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block", position: "relative" }}
            >
              {isLast && showAsterisk ? (
                <>
                  {word}
                  <sup
                    style={{
                      position: "absolute",
                      top: "0.65em",
                      right: "-0.3em",
                      fontSize: "0.31em",
                      color: CREAM,
                    }}
                  >
                    *
                  </sup>
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

// ── WordsPullUpMultiStyle ─────────────────────────────────────────────────────
function WordsPullUpMultiStyle({ segments, containerClassName = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Flatten all words with their class, tracking global index
  const allWords = [];
  segments.forEach(({ text, className }) => {
    text.split(" ").forEach((word) => {
      allWords.push({ word, className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`} style={{ gap: "0.25em" }}>
      {allWords.map(({ word, className }, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-flex" }}>
          <motion.span
            className={className}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ── AnimatedLetter ─────────────────────────────────────────────────────────────
function AnimatedBody({ text, scrollYProgress }) {
  const chars = text.split("");
  return (
    <p
      style={{
        color: CREAM_PRIMARY,
        lineHeight: 1.6,
        fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
        textAlign: "center",
        maxWidth: "56rem",
        margin: "0 auto",
      }}
    >
      {chars.map((char, i) => {
        const total = chars.length;
        const start = (i / total) - 0.1;
        const end = (i / total) + 0.05;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [Math.max(0, start), Math.min(1, end)], [0.15, 1]);
        return (
          <motion.span key={i} style={{ opacity, display: "inline" }}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

// ── FeatureCard ───────────────────────────────────────────────────────────────
function FeatureCard({ children, index, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`rounded-2xl overflow-hidden relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ height: "100vh", padding: "1rem", background: "#000" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "1.5rem",
          overflow: "hidden",
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: noiseOverlaySvg,
            opacity: 0.7,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Navbar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <nav
            style={{
              background: "#000",
              borderRadius: "0 0 1rem 1rem",
              padding: "0.5rem 2rem",
              display: "flex",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {["Our story", "Collective", "Workshops", "Programs", "Inquiries"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "rgba(225,224,204,0.8)",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = "rgba(225,224,204,0.8)")}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Hero content - bottom aligned */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 1.5rem 0 1.5rem",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            alignItems: "flex-end",
          }}
        >
          {/* Giant heading */}
          <div style={{ overflow: "hidden" }}>
            <h1
              style={{
                fontSize: "20vw",
                fontWeight: 500,
                lineHeight: 0.85,
                letterSpacing: "-0.07em",
                color: CREAM,
                margin: 0,
                position: "relative",
              }}
            >
              <WordsPullUp text="Prisma" showAsterisk delay={0} />
            </h1>
          </div>

          {/* Right col */}
          <div style={{ paddingBottom: "2.5rem", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: `${CREAM_PRIMARY}b3`, fontSize: "0.8rem", lineHeight: 1.2, margin: 0 }}
            >
              Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
            </motion.p>

            <motion.a
              href="#"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: CREAM_PRIMARY,
                borderRadius: "9999px",
                padding: "0.4rem 0.4rem 0.4rem 1.2rem",
                textDecoration: "none",
                alignSelf: "flex-start",
                transition: "gap 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = "0.75rem"; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = "0.5rem"; }}
            >
              <span style={{ color: "#000", fontWeight: 500, fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                Join the lab
              </span>
              <div
                style={{
                  background: "#000",
                  borderRadius: "9999px",
                  width: "2.25rem",
                  height: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s ease",
                }}
              >
                <ArrowRight size={14} color={CREAM} />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const ABOUT_TEXT =
    "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div
        style={{
          background: "#101010",
          borderRadius: "1.5rem",
          padding: "4rem 2rem",
          maxWidth: "72rem",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: CREAM_PRIMARY,
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          Visual arts
        </motion.p>

        {/* Main heading */}
        <div
          style={{
            fontSize: "clamp(1.75rem, 5vw, 4rem)",
            lineHeight: 0.95,
            maxWidth: "48rem",
            margin: "0 auto 3rem",
          }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "I am Marcus Chen,", className: "" },
              { text: "a self-taught director.", className: "font-italic" },
              { text: "I have skills in color grading, visual effects, and narrative design.", className: "" },
            ]}
            containerClassName=""
          />
        </div>

        {/* Scroll-animated body text */}
        <AnimatedBody text={ABOUT_TEXT} scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

// ── FEATURES SECTION ──────────────────────────────────────────────────────────
const FEATURES_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";
const IMG1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85";
const IMG2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85";
const IMG3 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85";

function FeatureTextCard({ num, title, icon, items, index }) {
  return (
    <FeatureCard index={index}>
      <div
        style={{
          background: "#212121",
          height: "100%",
          minHeight: "480px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <div>
          <img src={icon} alt="" style={{ width: 44, height: 44, borderRadius: "0.5rem", marginBottom: "1.5rem", objectFit: "cover" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ color: "#555", fontSize: "0.65rem", fontWeight: 400 }}>{num}</span>
            <h3 style={{ color: CREAM, fontSize: "1rem", fontWeight: 500, margin: 0 }}>{title}</h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <Check size={13} color={CREAM_PRIMARY} style={{ marginTop: "0.15rem", flexShrink: 0 }} />
                <span style={{ color: "#9ca3af", fontSize: "0.75rem", lineHeight: 1.4 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom link */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            color: CREAM_PRIMARY,
            fontSize: "0.75rem",
            textDecoration: "none",
            opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          Learn more
          <ArrowRight size={12} style={{ transform: "rotate(-45deg)" }} />
        </a>
      </div>
    </FeatureCard>
  );
}

function FeaturesSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#000",
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      {/* bg-noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: bgNoiseSvg,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
        <div style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)", fontWeight: 400, lineHeight: 1.2 }}>
          <WordsPullUpMultiStyle
            segments={[
              { text: "Studio-grade workflows for visionary creators.", className: "" },
            ]}
            containerClassName=""
          />
          <div style={{ marginTop: "0.4rem" }}>
            <WordsPullUpMultiStyle
              segments={[
                { text: "Built for pure vision. Powered by art.", className: "gray-500-text" },
              ]}
              containerClassName=""
            />
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
          maxWidth: "90rem",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Card 1 - Video */}
        <FeatureCard index={0}>
          <div style={{ position: "relative", height: "480px", borderRadius: "1rem", overflow: "hidden" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              src={FEATURES_VIDEO}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
            <p
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                color: CREAM,
                fontSize: "1rem",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Your creative canvas.
            </p>
          </div>
        </FeatureCard>

        {/* Card 2 */}
        <FeatureTextCard
          index={1}
          num="01"
          title="Project Storyboard."
          icon={IMG1}
          items={[
            "Drag-and-drop visual timeline for every scene and sequence.",
            "Attach references, mood boards, and director notes per shot.",
            "Real-time sync across your entire production crew.",
            "Export to PDF, FCP, or Premiere in a single click.",
          ]}
        />

        {/* Card 3 */}
        <FeatureTextCard
          index={2}
          num="02"
          title="Smart Critiques."
          icon={IMG2}
          items={[
            "AI-powered frame analysis with cinematic reference matching.",
            "Creative notes overlaid directly onto your footage timeline.",
            "Seamless integrations with DaVinci, Premiere, and Avid.",
          ]}
        />

        {/* Card 4 */}
        <FeatureTextCard
          index={3}
          num="03"
          title="Immersion Capsule."
          icon={IMG3}
          items={[
            "One-click notification silencing for deep creative sessions.",
            "Curated ambient soundscapes tuned to your project mood.",
            "Auto-sync focus blocks with your production schedule.",
          ]}
        />
      </div>
    </section>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function PrismaLanding() {
  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: CREAM,
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .font-italic {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          color: ${CREAM};
        }

        .gray-500-text {
          color: #6b7280;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
          nav {
            gap: 1rem !important;
            padding: 0.5rem 1rem !important;
          }
          nav a {
            font-size: 0.6rem !important;
          }
        }
      `}</style>

      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </div>
  );
}
