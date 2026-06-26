import { connection } from "next/server";
import { cookies } from "next/headers";
import { ProductCard } from "../components/ProductCard";
import { SponsoredProducts } from "../components/SponsoredProducts";
import { listProductsFromDb } from "@/domains/catalog/repository/productRepository";

export default async function Home() {
    await connection();
    const variant = (await cookies()).get("ab_prefetch_variant")?.value;
    const shouldPrefetch = variant !== "B";
    const products = await listProductsFromDb();
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="mb-14 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Nos produits
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                    Découvrez une sélection soignée pour le bureau, l&apos;audio et le
                    quotidien.
                </p>
            </section>

            <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} shouldPrefetch={shouldPrefetch}/>
                ))}
            </section>

            <SponsoredProducts limit={6} linkToInternal />
        </div>
    );
}