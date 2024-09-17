"use client"
export default function FilterError({ error }) {
    return <div id='error'>
        {error.message}
    </div>
}