"use client"
import { handleImageSrcError } from "@/lib/utils"
export default function CustomImage({ img }) {
    console.log(img)
    return <img src={img.includes("http") ? img : `/images/${img}`} alt={img} onError={(e) => { handleImageSrcError(e) }}></img>

}