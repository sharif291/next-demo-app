import { getArticlesItem } from "@/lib/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlesDetailsPage({ params }) {
  let slug = params.slug;
  const articlesItem = await getArticlesItem(slug)
  if (!articlesItem) {
    notFound();
  }
  return (
    <>
      <arrticle className="articles-article">
        <header>
          <Link href={`/articles/${articlesItem.slug}/image`}><img src={articlesItem.image.includes("http") ? articlesItem.image : `/images/${articlesItem.image}`} alt={articlesItem.title} /></Link>
          <h1>{articlesItem.title} -by <span className=" capitalize">{articlesItem.creatorName || "Unknown"}</span></h1>
          <time dateTime={articlesItem.date}>{articlesItem.date}</time>
        </header>
        <p dangerouslySetInnerHTML={{
          __html: articlesItem.content.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}></p>
      </arrticle>
    </>
  );
}
