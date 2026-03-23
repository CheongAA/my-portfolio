import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category?: string;
  series?: string;
  seriesOrder?: number;
};

export type Post = PostMeta & { content: string };

function getMdxFiles(dir: string): { slug: string; filePath: string }[] {
  const results: { slug: string; filePath: string }[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push({
        slug: entry.name.replace(/\.mdx$/, ""),
        filePath: fullPath,
      });
    }
  }
  return results;
}

function findMdxFile(slug: string): string | null {
  const files = getMdxFiles(POSTS_DIR);
  const found = files.find((f) => f.slug === slug);
  return found ? found.filePath : null;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return getMdxFiles(POSTS_DIR)
    .map(({ slug, filePath }) => {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: (data.description as string) ?? "",
        category: (data.category as string) ?? undefined,
        series: (data.series as string) ?? undefined,
        seriesOrder: (data.seriesOrder as number) ?? undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const filePath = findMdxFile(slug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: (data.description as string) ?? "",
    category: (data.category as string) ?? undefined,
    series: (data.series as string) ?? undefined,
    seriesOrder: (data.seriesOrder as number) ?? undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return getMdxFiles(POSTS_DIR).map(({ slug }) => slug);
}
