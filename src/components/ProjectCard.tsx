"use client";

import { motion } from "framer-motion";

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
    <a href={link} target="_blank" rel="noopener noreferrer">
      <motion.div className="group relative h-full flex flex-col bg-card-bg rounded-2xl p-8 hover:bg-nav-hover transition-all duration-500 cursor-pointer border border-border hover:border-primary/20">
        {/* Image */}
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${image}`}
            alt={title}
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Content */}
        <h3 className="mb-2 text-2xl font-medium">{title}</h3>
        <p className="mb-4 text-muted-foreground">{description}</p>

        <ul className="mt-auto flex flex-wrap gap-2">
          {tech.map((item) => (
            <li key={item} className="rounded-md bg-muted px-2 py-1 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </a>
  );
}
