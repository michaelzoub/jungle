import ReviewForm from "@/app/review/[slug]/ReviewForm"

type PageProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ReviewPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params;
    return <ReviewForm slug={slug} />
}