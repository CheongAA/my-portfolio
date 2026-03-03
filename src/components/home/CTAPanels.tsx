"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const panelVariants = {
  rest: {},
  hover: {},
};

const bgVariants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
};

const textVariants = {
  rest: { color: "var(--color-primary)" },
  hover: { color: "var(--color-background)" },
};

const arrowVariants = {
  rest: { opacity: 0, x: -12, color: "var(--color-primary)" },
  hover: { opacity: 1, x: 0, color: "var(--color-background)" },
};

const subtitleVariants = {
  rest: { opacity: 0.5, color: "var(--color-secondary)" },
  hover: { opacity: 1, color: "var(--color-background)" },
};

const bgTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
const textTransition = { duration: 0.3 };

interface PanelProps {
  href: string;
  title: string;
  subtitle: string;
  borderRight?: boolean;
}

function Panel({ href, title, subtitle, borderRight }: PanelProps) {
  return (
    <Link href={href} className="flex-1 block">
      <motion.div
        className={`relative overflow-hidden min-h-[45vh] flex flex-col justify-end p-10 md:p-16 cursor-pointer${borderRight ? " border-r border-border" : ""}`}
        variants={panelVariants}
        initial="rest"
        whileHover="hover"
      >
        {/* Hover background fill (bottom to top) */}
        <motion.div
          className="absolute inset-0 bg-foreground origin-bottom"
          variants={bgVariants}
          transition={bgTransition}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.p
            className="text-sm tracking-[0.2em] uppercase mb-6 font-medium"
            variants={subtitleVariants}
            transition={textTransition}
          >
            {subtitle}
          </motion.p>

          <div className="flex items-end justify-between gap-4">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none"
              variants={textVariants}
              transition={textTransition}
            >
              {title}
            </motion.h2>

            <motion.span
              className="text-4xl md:text-6xl font-light mb-1"
              variants={arrowVariants}
              transition={textTransition}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function CTAPanels() {
  const tProjects = useTranslations("projects");
  const tContact = useTranslations("contact");

  return (
    <section className="border-t border-border">
      <div className="flex flex-col md:flex-row">
        <Panel
          href="/projects"
          title={tProjects("title")}
          subtitle={tProjects("cta")}
          borderRight
        />
        <Panel
          href="/contact"
          title={tContact("title")}
          subtitle={tContact("cta")}
        />
      </div>
    </section>
  );
}
