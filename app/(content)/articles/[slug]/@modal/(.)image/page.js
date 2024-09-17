
import ModalBackdrop from "@/components/modal-backdrop";
import { getArticlesItem } from "@/lib/articles";

export default async function ImagePage({ params }) {
    let slug = params.slug;
    const articlesItem = await getArticlesItem(slug)
    if (!articlesItem) {
        notFound();
    }
    return <>
        <ModalBackdrop />
        <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={articlesItem.image.includes("http") ? articlesItem.image : `/images/${articlesItem.image}`} alt={articlesItem.title} />
            </div>
        </dialog>
    </>
}