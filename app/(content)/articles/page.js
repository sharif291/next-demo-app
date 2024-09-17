import ArticlesList from "@/components/articles-list";
import { getAllArticles } from "@/lib/articles";


// export const revalidate = 60
export const dynamic = 'force-dynamic'
export default async function ArticlesPage() {
    const articles = await getAllArticles();
    console.log("hello")
    return (
      <>
        <ArticlesList articles={articles} />
      </>
    );
  }
  