/** Produit sponsorisé (ex. Mock.shop) : affiché en pub, lien externe, pas d’ajout au panier interne */
export type SponsoredProduct = {
    id: string;
    /** Handle pour l’URL interne /product-partenaire/[handle] */
    handle: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    imageUrl: string;
    /** Lien externe vers la fiche produit partenaire (ex. mock.shop) */
    url: string;
};

export function formatSponsoredPrice(product: SponsoredProduct): string {
    return `${Number(product.price).toFixed(2)} ${product.currency}`;
}