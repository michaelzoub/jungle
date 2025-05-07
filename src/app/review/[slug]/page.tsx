import ReviewForm from "./ReviewForm"

export default function ReviewPage({
    params,
}: {
    params: { slug: string }
}) {
    return <ReviewForm slug={params.slug} />
}