"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/posts";

const POSTS_PER_PAGE = 5;

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
          <button
            onClick={() => handleCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === null
                ? "border-primary text-primary"
                : "border-border text-secondary hover:border-primary/50 hover:text-primary"
            }`}
          >
            {t("all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeCategory === cat
                  ? "border-primary text-primary"
                  : "border-border text-secondary hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
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
                    <span className="text-xs text-primary/60 border border-primary/20 rounded-full px-3 py-1">
                      {post.series} #{post.seriesOrder}
                    </span>
                  )}
                  {post.category && (
                    <span className="text-xs text-secondary border border-border rounded-full px-3 py-1">
                      {post.category}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="text-sm text-secondary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← {t("prev")}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-full transition-colors ${
                  p === page
                    ? "bg-foreground text-background"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="text-sm text-secondary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("next")} →
          </button>
        </div>
      )}
    </div>
  );
}
