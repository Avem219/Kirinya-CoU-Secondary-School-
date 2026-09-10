import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { NewsCard } from "@/components/cards/news-card";
import { getFeaturedNews } from "@/lib/dev-data";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news and announcements from Kirinya C.O.U.S.S.",
};

export default async function NewsIndexPage() {
  // In production this becomes a paginated query against NewsArticle
  // (status = PUBLISHED), with category filters and search. The architecture
  // here (typed summaries, card component, empty state) already matches
  // that shape.
  const articles = await getFeaturedNews();

  return (
    <>
      <PageHero
        eyebrow="News"
        title="School News"
        description="Announcements and stories from around Kirinya C.O.U.S.S."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <ContentSection>
        {articles.length === 0 ? (
          <EmptyState
            title="No news published yet"
            description="Verified news articles from the school will appear here, with categories and search, once added through the CMS."
          />
        ) : (
          <ul className="grid gap-8 sm:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </ul>
        )}
      </ContentSection>
    </>
  );
}
