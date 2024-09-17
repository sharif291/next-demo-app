import ArticlesList from "@/components/articles-list";
import { getAvailableArticlesMonths, getAvailableArticlesYears, getArticlesForYear, getArticlesForYearAndMonth, getAllArticles } from "@/lib/articles";
import Link from "next/link";
import { Suspense } from "react";
async function FilteredArticles({ year, month }) {
    year = parseInt(year)
    month = parseInt(month)
    console.log(year, month)
    let filteredArticles;
    let content = <p>No content available.</p>;
    if (!year && !month) {
        filteredArticles = await getAllArticles()
    }
    if (year && !month) {
        filteredArticles = await getArticlesForYear(year)
    }
    if (year && month) {
        filteredArticles = await getArticlesForYearAndMonth(year, month)
    }
    if (filteredArticles && filteredArticles.length) {
        content = <ArticlesList articles={filteredArticles} />
    }
    return content
}
async function FilterHeader({ year, month }) {
    year = parseInt(year)
    month = parseInt(month)
    let links = await getAvailableArticlesYears()
    if (year && !month) {
        links = await getAvailableArticlesMonths(year)
    }
    if (year && month) {
        links = []
    }
    if (year && !(await getAvailableArticlesYears()).includes(year) || !month && (await getAvailableArticlesMonths()).includes(month)) {
        throw new Error("Invalid filter")
    }
    return <header id='archive-header'>
        <ul>
            {links.map(link => {
                let href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                return <li key={link}>
                    <Link href={href}>{link}</Link>
                </li>
            })}
        </ul>

    </header>
}
export default async function FilteredArticlesPage({ params }) {
    const selectedYear = params.filter?.[0];
    const selectedMonth = params.filter?.[1]
    return <>
        <Suspense fallback={<p>Header loading...</p>}><FilterHeader year={selectedYear} month={selectedMonth} /></Suspense>
        <Suspense fallback={<p>Archive Loading...</p>}><FilteredArticles year={selectedYear} month={selectedMonth} /></Suspense></>
}