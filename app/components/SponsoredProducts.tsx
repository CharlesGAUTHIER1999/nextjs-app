import {getSponsoredProducts} from "@/domains/catalog/repository/sponsoredProductRepository";
import {SponsoredProductCard} from "@/app/components/SponsoredProductCard";
import {RevalidateMockshopButton} from "@/app/components/RevalidateMockshopButton";

type Props = {
    limit?: number;
    title?: string;
    /** true = lien vers notre fiche produit partenaire, false = lien externe */
    linkToInternal?: boolean;
};

export async function SponsoredProducts({
                                            limit = 6,
                                            title = "Produits sponsorisés",
                                            linkToInternal = false,
                                        }: Props) {
    const products = await getSponsoredProducts(limit);

    if (products.length === 0) return null;

    return (
        <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                </h2>
                <RevalidateMockshopButton/>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Sélection de nos partenaires
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <SponsoredProductCard
                        key={product.id}
                        product={product}
                        linkToInternal={linkToInternal}
                    />
                ))}
            </div>
        </section>
    );
}