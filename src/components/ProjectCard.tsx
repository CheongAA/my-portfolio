import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
}

export default function ProjectCard({ title, description, tech }: ProjectCardProps) {
  return (
    <motion.div className="group relative h-full flex flex-col bg-card-bg rounded-2xl p-8 hover:bg-nav-hover transition-all duration-500 cursor-pointer border border-border hover:border-primary/20">
      <h3 className="text-3xl font-medium text-primary mb-4 group-hover:text-primary/90 transition">
        {title}
      </h3>
      <p className="text-secondary text-base leading-relaxed mb-6 grow">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="px-3 py-1 text-xs bg-nav-hover text-secondary rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
