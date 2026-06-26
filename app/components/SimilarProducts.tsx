import {connection} from "next/server";
import {cookies} from "next/headers";
import {getSimilarProducts} from "@/domains/catalog/repository/productRepository";
import {ProductCard} from "@/app/components/ProductCard";

type Props = { slug: string };

export async function SimilarProducts({ slug }: Props) {
    await connection();
    const variant = (await cookies()).get("ab_prefetch_variant")?.value;
    const prefetchMode = variant === "B" ? "hover" : "auto";
    const similars = await getSimilarProducts(slug);

    await new Promise((r) => setTimeout(r, 2000)); //Simulation de latence

    if (similars.length === 0) return null;

    return (
        <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Produits similaires
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {similars.map((product) => (
                    <ProductCard key={product.id} product={product} prefetchMode={prefetchMode} />
                ))}
            </div>
        </section>
    );
}