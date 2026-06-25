import { Suspense } from "react";
import { ProductDetail } from "@/app/components/ProductDetail";

// Skelette du "reste du produit" (boundary extérieur).
function ProductDetailSkeleton() {
    return (
        <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
            <div className="space-y-4">
                <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-64 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
        </div>
    );
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
    const { slug } = await props.params;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Le shell (ce conteneur) est envoyé immédiatement.            */}
            {/* Le produit, puis les similaires (imbriqués), streament ensuite. */}
            <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductDetail slug={slug} />
            </Suspense>
        </div>
    );
}
