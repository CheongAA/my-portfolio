"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/posts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const POSTS_PER_PAGE = 5;

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

interface BlogListProps {
  posts: PostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(
      posts.map((p) => p.category).filter(Boolean) as string[],
    );
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = !activeCategory || p.category === activeCategory;
      const matchesSearch = !q || p.title.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  function handleCategory(cat: string | null) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  if (posts.length === 0) {
    return <p className="text-secondary">{t("empty")}</p>;
  }

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent border border-border rounded-lg px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-primary/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          <Button
            variant={"outline"}
            onClick={() => handleCategory(null)}
            data-active={activeCategory === null}
          >
            {t("all")}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={"outline"}
              onClick={() => handleCategory(cat)}
              data-active={activeCategory === cat}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {/* Post list */}
      {paginated.length === 0 ? (
        <p className="text-secondary py-12 text-center">{t("noResults")}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {paginated.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-baseline gap-6 flex-col md:flex-row md:gap-12 py-6 group"
              >
                <span className="text-secondary text-sm tabular-nums shrink-0">
                  {post.date}
                </span>
                <span className="flex-1 text-primary text-lg font-medium group-hover:underline underline-offset-4">
                  {post.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {post.series && (
                    <Badge>
                      {post.series} #{post.seriesOrder}
                    </Badge>
                  )}
                  {post.category && <Badge>{post.category}</Badge>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border gap-2">
          <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            ← {t("prev")}
          </Button>

          {/* Mobile: current / total */}
          <span className="text-sm text-secondary md:hidden">
            {page} / {totalPages}
          </span>

          {/* Desktop: smart page numbers */}
          <div className="hidden md:flex items-center gap-1">
            {getPageNumbers(page, totalPages).map((item, i) =>
              item === "..." ? (
                <span key={`ellipsis-${i}`} className="w-8 text-center text-secondary text-sm">…</span>
              ) : (
                <Button
                  key={item}
                  data-active={item === page}
                  onClick={() => setPage(item)}
                  variant="secondary"
                  className="w-8 h-8 text-sm"
                >
                  {item}
                </Button>
              )
            )}
          </div>

          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            {t("next")} →
          </Button>
        </div>
      )}
    </div>
  );
}
