import Link from "next/link";
import type { NewsArticleSummary } from "@/lib/content-types";

export function NewsCard({ article }: { article: NewsArticleSummary }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-UG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <li className="group rounded-xl border border-ink/10 transition hover:border-ink/20 hover:shadow-sm">
      <Link href={`/news/${article.slug}`} className="block p-6">
        <div
          aria-hidden
          className="mb-4 aspect-video rounded-lg bg-ink/10 bg-cover bg-center"
          style={
            article.featuredImageUrl
              ? { backgroundImage: `url(${article.featuredImageUrl})` }
              : undefined
          }
        />
        {article.categoryName && (
          <p className="text-xs font-semibold uppercase tracking-wide text-forest">
            {article.categoryName}
          </p>
        )}
        <h3 className="mt-2 font-serif text-lg font-semibold group-hover:underline">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-ink/60">{article.excerpt}</p>
        )}
        {date && <p className="mt-3 text-xs text-ink/50">{date}</p>}
      </Link>
    </li>
  );
}
