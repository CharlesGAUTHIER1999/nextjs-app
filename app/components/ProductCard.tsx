import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/domains/catalog/entity/product";
import {formatPrice, getProductPath, isInStock, isLowStock,} from "@/domains/catalog/entity/product";

export function ProductCard({
                                product,
                                shouldPrefetch = true,
                            }: {
    product: Product;
    shouldPrefetch?: boolean;
}) {
    const inStock = isInStock(product);
    const lowStock = isLowStock(product);

    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
            <Link href={getProductPath(product)} prefetch={shouldPrefetch} className="flex flex-col flex-1">
                <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    {!inStock && (
                        <span
                            className="absolute left-3 top-3 rounded-full bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-white">
              Rupture
            </span>
                    )}
                    {inStock && lowStock && (
                        <span
                            className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-medium text-white">
              Plus que {product.stock}
            </span>
                    )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {product.brand} · {product.category}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {product.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {product.description}
                    </p>
                    <div className="mt-auto pt-4">
                        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {formatPrice(product)}
                        </p>
                        <span
                            className="mt-2 inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Voir le produit
              <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}