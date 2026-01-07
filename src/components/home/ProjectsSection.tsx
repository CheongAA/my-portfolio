import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Container from "../Container";
import ProjectCard from "../ProjectCard";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const projects = t("projects.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
  }>;

  return (
    <section id="experiences">
      <Container>
        {/* Title */}
        <motion.h2
          className="mb-16 text-5xl md:text-7xl font-medium tracking-tight text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("projects.title")}
        </motion.h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                image={project.image}
                link={project.link}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
