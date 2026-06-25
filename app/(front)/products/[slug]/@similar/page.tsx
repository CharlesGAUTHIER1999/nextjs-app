import {SimilarProducts} from "@/app/components/SimilarProducts";

export default async function SimilarSlot(props: PageProps<"/products/[slug]">) {
    const {slug} = await props.params;
    return <SimilarProducts slug={slug}/>;
}