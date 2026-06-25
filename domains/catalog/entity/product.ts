// --- Types ---

export type ProductImages = {
    main: string;
    gallery: string[];
};

export type ProductSpecs = Record<string, string | number | boolean | undefined>;

export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    stock: number;
    sku: string;
    category: string;
    brand: string;
    images: ProductImages;
    specs: ProductSpecs;
};

// --- Règles métier ---

const LOW_STOCK_THRESHOLD = 10;

export function isInStock(product: Product): boolean {
    return product.stock > 0;
}

export function isLowStock(
    product: Product,
    threshold: number = LOW_STOCK_THRESHOLD
): boolean {
    return product.stock > 0 && product.stock <= threshold;
}

export function formatPrice(product: Product): string {
    return `${product.price.toFixed(2)} ${product.currency}`;
}

export function formatStockLabel(product: Product): string {
    if (!isInStock(product)) return "Rupture de stock";
    const plural = product.stock > 1 ? "s" : "";
    return `En stock (${product.stock} disponible${plural})`;
}

export function formatSpecLabel(key: string): string {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^\w/, (c) => c.toUpperCase())
        .trim();
}

export function formatSpecValue(value: unknown): string {
    if (typeof value === "boolean") return value ? "Oui" : "Non";
    return String(value);
}

export function getProductPath(product: Product): string {
    return `/products/${product.slug}`;
}