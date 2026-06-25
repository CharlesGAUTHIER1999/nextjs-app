import Image from "next/image";
import Link from "next/link";
import {getSponsoredProductByHandle} from "@/domains/catalog/repository/sponsoredProductRepository";
import {formatSponsoredPrice} from "@/domains/catalog/entity/sponsoredProduct";

export default async function ProduitPartenairePage(
    props: PageProps<"/product-partenaire/[handle]">
) {
    const {handle} = await props.params;
    const product = await getSponsoredProductByHandle(handle);

    if (!product) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <p>Produit partenaire introuvable.</p>
                <Link href="/" className="mt-4 text-violet-600 hover:underline">
                    Retour à l’accueil
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
                    Accueil
                </Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-900 dark:text-zinc-200">
          Produit partenaire
        </span>
                <span className="mx-2">/</span>
                <span className="text-zinc-900 dark:text-zinc-200">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        {product.imageUrl ? (
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-zinc-400">
                                Pas d’image
                            </div>
                        )}
                        <span
                            className="absolute left-4 top-4 rounded-full bg-violet-600/90 px-3 py-1.5 text-xs font-medium text-white">
              Sponsorisé
            </span>
                    </div>
                </div>

                <div>
                    <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                        {product.name}
                    </h1>

                    <div className="mt-6">
                        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {formatSponsoredPrice(product)}
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-400">
                        <p className="whitespace-pre-wrap">{product.description}</p>
                    </div>

                    <div className="mt-8">
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
                        >
                            Acheter sur le site partenaire
                            <svg
                                className="ml-2 h-4 w-4"
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
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}