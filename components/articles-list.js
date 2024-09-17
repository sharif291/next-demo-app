import { handleImageSrcError } from "@/lib/utils"
import Link from "next/link"
import CustomImage from "./custom-image"

export default function ArticlesList({ articles }) {

    return <ul className="articles-list">
        {
            articles.length > 0 ? articles.map((articlesItem) => (
                <li key={articlesItem.id}>
                    <Link href={`/articles/${articlesItem.slug}`}>
                        <CustomImage img={articlesItem.image}></CustomImage>
                        <span>{articlesItem.title}</span>
                    </Link>
                </li>
            )) : "No content available."
        }
    </ul>
}