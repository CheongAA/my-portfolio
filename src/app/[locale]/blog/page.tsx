import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/posts";
import Container from "@/components/Container";
import BlogList from "@/components/blog/BlogList";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getAllPosts();

  return (
    <Container>
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-primary mb-16">
        {t("title")}
      </h1>
      <BlogList posts={posts} />
    </Container>
  );
}
