import ReviewForm from "./ReviewForm"

export default async function ReviewPage({
    params,
}: {
    params: { slug: string }
}) {
    return <ReviewForm slug={params.slug} />
}