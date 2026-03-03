import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPost, getAllPosts, getAllSlugs } from "@/lib/posts";
import Container from "@/components/Container";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const post = getPost(slug);
  if (!post) notFound();

  // 시리즈 포스트 목록
  const seriesPosts = post.series
    ? getAllPosts()
        .filter((p) => p.series === post.series)
        .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
    : [];

  return (
    <Container className="pb-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm mb-12"
      >
        {t("backToList")}
      </Link>

      <p className="text-secondary text-sm mb-4">{post.date}</p>
      <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-16">
        {post.title}
      </h1>

      <article className="mdx-content">
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {/* 시리즈 네비게이션 */}
      {seriesPosts.length > 1 && (
        <div className="mt-20 pt-12 border-t border-border">
          <p className="text-xs text-secondary uppercase tracking-widest mb-6">
            {post.series}
          </p>
          <ul className="flex flex-col gap-2">
            {seriesPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className={`flex items-center gap-3 py-2 text-sm transition-colors ${
                    p.slug === slug
                      ? "text-primary font-medium"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  <span className="tabular-nums text-xs w-5 shrink-0 text-center">
                    {p.seriesOrder}
                  </span>
                  {p.title}
                  {p.slug === slug && (
                    <span className="ml-auto text-xs text-primary/50">{t("currentPost")}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
