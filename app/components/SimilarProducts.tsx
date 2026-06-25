import { getSimilarProducts } from "@/domains/catalog/repository/productRepository";
import { ProductCard } from "./ProductCard";

// Server Component asynchrone : sa propre requête, indépendante du produit.
// (Servira de frontière de streaming à l'exercice 5.)
export async function SimilarProducts({ slug }: { slug: string }) {
    const products = await getSimilarProducts(slug);
    if (products.length === 0) return null;

    return (
        <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Produits similaires
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
