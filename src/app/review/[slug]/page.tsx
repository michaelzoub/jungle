import ReviewForm from "@/app/review/[slug]/ReviewForm"
interface Props {
    params: {
      slug: string;
    };
  }


export default async function ReviewPage({ params }: Props) {
    return <ReviewForm slug={params.slug} />
}