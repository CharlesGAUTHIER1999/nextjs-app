import {ProductCard} from "../components/ProductCard";
import {getProducts} from "@/domains/catalog/repository/productRepository";

export default function Home() {
    const products = getProducts();
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="mb-14 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Nos produits
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                    Découvrez une sélection de nos meilleurs véhicules disponibles.
                </p>
            </section>

            <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </section>
        </div>
    );
}