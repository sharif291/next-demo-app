import ArticlesList from "@/components/articles-list";
import { getLatestArticles } from "@/lib/articles";
import { Suspense } from "react";

export default async function LatestArticlesPage() {
    const latestArticles = await getLatestArticles()
    return <>
        <h1>Latest Articles</h1>
        <Suspense fallback={<p>Latest Loading</p>}>
            <ArticlesList articles={latestArticles} />
        </Suspense>
    </>
}