import ReviewForm from "@/app/review/[slug]/ReviewForm"

export default async function ReviewPage({
    params,
}: {
    params: { slug: string }
}) {
    return <ReviewForm slug={params.slug} />
}