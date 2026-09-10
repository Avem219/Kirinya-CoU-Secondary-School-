import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { getNewsArticleBySlug } from "@/lib/dev-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: article.featuredImageUrl
      ? { images: [{ url: article.featuredImageUrl }] }
      : undefined,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  // No published articles exist yet — this correctly 404s rather than
  // rendering fabricated content for any slug.
  if (!article) notFound();

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-UG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <PageHero
        eyebrow={article.categoryName ?? "News"}
        title={article.title}
        description={date ?? undefined}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />
      <ContentSection>
        <article
          className="prose prose-neutral mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      </ContentSection>
    </>
  );
}
