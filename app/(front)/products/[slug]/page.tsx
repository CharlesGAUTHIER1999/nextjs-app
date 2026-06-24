import Image from "next/image";
import Link from "next/link";
import {
    formatPrice,
    formatSpecLabel,
    formatSpecValue,
    formatStockLabel,
    isInStock,
} from "@/domains/catalog/entity/product";
import {getProductBySlug} from "@/domains/catalog/repository/productRepository";
import {AddToCartButton} from "@/app/components/cart/AddToCartButton";

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <p>Produit introuvable.</p>
            </div>
        );
    }

    // Onglet actif piloté par l'URL (?tab=specs), « description » par défaut.
    const { tab } = await props.searchParams;
    const activeTab = tab === "specs" ? "specs" : "description";
    const specs = Object.entries(product.specs).filter(
        ([, value]) => value !== undefined
    );

    const inStock = isInStock(product);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                    <div className="mt-6">
                        <div
                            role="tablist"
                            className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800"
                        >
                            <Link
                                href={`/products/${product.slug}?tab=description`}
                                scroll={false}
                                role="tab"
                                aria-selected={activeTab === "description"}
                                className={
                                    activeTab === "description"
                                        ? "-mb-px border-b-2 border-zinc-900 px-4 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                                        : "px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }
                            >
                                Description
                            </Link>
                            <Link
                                href={`/products/${product.slug}?tab=specs`}
                                scroll={false}
                                role="tab"
                                aria-selected={activeTab === "specs"}
                                className={
                                    activeTab === "specs"
                                        ? "-mb-px border-b-2 border-zinc-900 px-4 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                                        : "px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }
                            >
                                Spécifications
                            </Link>
                        </div>

                        <div role="tabpanel" className="pt-4">
                            {activeTab === "description" ? (
                                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                    {product.description}
                                </p>
                            ) : specs.length > 0 ? (
                                <dl className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {specs.map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex justify-between gap-4 py-2 text-sm"
                                        >
                                            <dt className="text-zinc-500 dark:text-zinc-400">
                                                {formatSpecLabel(key)}
                                            </dt>
                                            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {formatSpecValue(value)}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            ) : (
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Aucune spécification disponible.
                                </p>
                            )}
                        </div>
                    </div>

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
                        <AddToCartButton product={product} />
                    </div>

                    <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
                        Réf. {product.sku}
                    </p>
                </div>
            </div>
        </div>
    );
}