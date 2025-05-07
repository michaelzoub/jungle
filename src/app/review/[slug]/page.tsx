"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"

export default function ReviewPage({
    params,
  }: {
    params: { slug: string }
  } & { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [submit, setSubmit] = useState(false);
    const [review, setReview] = useState("");

    async function reviewSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmit(true);
        setReview("");
        const response = await fetch("/api/submitReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review: review,
                _id: params.slug
            })
        })
    }

    useEffect(() => {
        
    }, [])

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <form className="flex flex-col justify-center items-center gap-3 w-[250px] md:w-[400px]" onSubmit={reviewSubmit}>
                <textarea onChange={(e) => setReview(e.target.value)} value={review} className="w-full rounded-lg shadow-md p-2 h-[150px] border-[1px]" placeholder="Enter review"></textarea>
                <Button className="w-full">{ submit? <Check></Check> : "Submit Review" }</Button>
            </form>
        </main>
    )
}