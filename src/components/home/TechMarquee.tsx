"use client";

import { motion } from "framer-motion";
import Container from "../Container";

const TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Figma",
  "Git",
  "Zustand",
  "React Query",
  "Vite",
  "REST API",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // 3배 복사: 33.33% 이동 시 seamless loop
  const items = [...TECHS, ...TECHS, ...TECHS];

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="px-5 py-2 border border-border rounded-full text-sm text-secondary whitespace-nowrap hover:text-primary hover:border-primary transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-8 overflow-hidden">
      <Container className="px-0">
        <div className="flex flex-col gap-3">
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </Container>
    </section>
  );
}
