import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {Suspense} from "react";
import {connection} from "next/server";
import {AddToCartButton} from "@/app/components/AddToCartButton";
import {ProductTabs} from "@/app/components/ProductTabs";
import {formatPrice, formatStockLabel, isInStock,} from "@/domains/catalog/entity/product";
import {getProductBySlug, listProductsFromDb,} from "@/domains/catalog/repository/productRepository";

export async function generateStaticParams() {
    const products = await listProductsFromDb();
    return products.map((p) => ({slug: p.slug}));
}

export async function generateMetadata(
    props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
    await connection();
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: "Produit introuvable" };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [{ url: product.images.main, alt: product.name }],
        },
    };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
    await connection();
    const { slug } = await props.params;

    const product = await getProductBySlug(slug);

    if (!product) {
        return <p>Produit introuvable.</p>;
    }

    const inStock = isInStock(product);

    return (
        <>
            <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
                    Accueil
                </Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-900 dark:text-zinc-200">{product.name}</span>
            </nav>


            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Image
                            src={product.images.main}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    {product.images.gallery.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.gallery.map((url, i) => (
                                <div
                                    key={i}
                                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
                                >
                                    <Image
                                        src={url}
                                        alt={`${product.name} - vue ${i + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {product.brand} · {product.category}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                        {product.name}
                    </h1>
                    {/* Suspense required because ProductTabs uses useSearchParams() — distinct from PPR boundaries */}
                    <Suspense
                        fallback={
                            <div className="mt-4 h-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"/>
                        }
                    >
                        <ProductTabs slug={slug} product={product}/>
                    </Suspense>


                    <div className="mt-6 flex items-baseline gap-3">
                                            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                        {formatPrice(product)}
                                </span>
                        <span
                            className={
                                inStock
                                    ? "text-sm text-emerald-600 dark:text-emerald-400"
                                    : "text-sm text-zinc-500 dark:text-zinc-400"
                            }
                        >
                                    {formatStockLabel(product)}
                                  </span>
                    </div>
                    <div className="mt-8">
                        <AddToCartButton
                            disabled={!inStock}
                            slug={product.slug}
                            name={product.name}
                            price={product.price}
                            currency={product.currency}
                        />
                    </div>

                    <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
                        Réf. {product.sku}
                    </p>
                </div>
            </div>
        </>
    );
}