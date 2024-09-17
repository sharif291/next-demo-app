import { createArticle } from '@/lib/articles';
import classes from './page.module.css';
import ArticleFormSubmit from '@/components/article-form-submit';


export default function CreateArticlePage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite tips</span>
                </h1>
                <p>Or any other thought you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={createArticle}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <p>
                        <label htmlFor="image">Image URL</label>
                        <input type="text" id="image" name="image" required />
                    </p>
                    <p className={classes.actions}>
                        <ArticleFormSubmit />
                    </p>
                </form>
            </main>
        </>
    );
}