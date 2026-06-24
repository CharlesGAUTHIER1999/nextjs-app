import type {Product} from "@/domains/catalog/entity/product";
import {getProductBySlug as findProductBySlug} from "@/domains/catalog/entity/product";
import productsJson from "@/domains/catalog/data/products.json";

const products = productsJson as unknown as Product[];

export function getProducts(): Product[] {
    return products;
}

export function getProductBySlug(slug: string): Product | undefined {
    return findProductBySlug(products, slug);
}