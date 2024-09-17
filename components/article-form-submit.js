"use client";
import { useFormStatus } from "react-dom";

export default function ArticleFormSubmit() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit">
            {pending ? "Submitting..." : "Create Article"}
        </button>
    );
}
