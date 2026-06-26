import type { Product } from "@/domains/catalog/entity/product";
import type { ProductUpdateInput } from "@/domains/catalog/entity/productSchema";
import {
    findAllProducts,
    findProductById as findProductByIdInDb,
    findProductBySlug as findProductBySlugInDb,
    findSimilarProductsBySlug,
    updateProduct as updateProductInDb,
} from "@/domains/catalog/data/productData";

export async function getProducts(): Promise<Product[]> {
    return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    return findProductBySlugInDb(slug);
}

export async function listProductsFromDb(): Promise<Product[]> {
    return getProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
    return findProductByIdInDb(id);
}

export async function updateProduct(
    id: string,
    data: ProductUpdateInput,
): Promise<Product> {
    return updateProductInDb(id, data);
}

export async function getSimilarProducts(slug: string): Promise<Product[]> {
    return findSimilarProductsBySlug(slug);
}