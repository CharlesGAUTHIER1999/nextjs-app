import Image from "next/image";
import type {SponsoredProduct} from "@/domains/catalog/entity/sponsoredProduct";
import {formatSponsoredPrice} from "@/domains/catalog/entity/sponsoredProduct";
import {PrefetchLink, type PrefetchMode} from "@/app/components/PrefetchLink";

type Props = {
    product: SponsoredProduct;
    /** true = lien vers notre fiche /product-partenaire/[handle], false = lien externe partenaire */
    linkToInternal?: boolean;
    prefetchMode?: PrefetchMode;
};

export function SponsoredProductCard({
                                         product,
                                         linkToInternal = false,
                                         prefetchMode = "auto",
                                     }: Props) {
    const href = linkToInternal
        ? `/product-partenaire/${product.handle}`
        : product.url;
    const isExternal = !linkToInternal;

    const linkContent = (
        <>
            <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-zinc-400">
                        Pas d’image
                    </div>
                )}
                <span
                    className="absolute left-3 top-3 rounded-full bg-violet-600/90 px-2.5 py-1 text-xs font-medium text-white">
          Sponsorisé
        </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {product.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {product.description}
                </p>
                <div className="mt-auto pt-4">
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formatSponsoredPrice(product)}
                    </p>
                    <span
                        className="mt-2 inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {linkToInternal ? "Voir le produit" : "Voir sur le partenaire"}
                        {isExternal ? (
                            <svg
                                className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        )}
          </span>
                </div>
            </div>
        </>
    );

    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
            {isExternal ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex flex-1 flex-col"
                >
                    {linkContent}
                </a>
            ) : (
                <PrefetchLink href={href} mode={prefetchMode} className="flex flex-1 flex-col">
                    {linkContent}
                </PrefetchLink>
            )}
        </article>
    );
}