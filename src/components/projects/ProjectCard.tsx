"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import basePath from "@/lib/basePath";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  link,
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full block"
    >
      <motion.div className="group relative h-full flex flex-col bg-foreground/[0.04] backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/10 transition-all duration-500 cursor-pointer hover:border-foreground/25 hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-foreground)_7%,transparent)]">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={`${basePath}${image}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-medium tracking-tight leading-tight">
              {title}
            </h3>
            <svg
              className="w-4 h-4 shrink-0 text-foreground/30 mt-0.5 transition-colors duration-300 group-hover:text-foreground/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>

          <p className="text-sm text-foreground/50 leading-relaxed mb-5">
            {description}
          </p>

          <ul className="mt-auto flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </a>
  );
}
