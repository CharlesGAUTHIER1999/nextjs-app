import {prisma} from "@/lib/prisma";
import type {Product, ProductImages, ProductSpecs} from "@/domains/catalog/entity/product";
import type {ProductUpdateInput} from "@/domains/catalog/entity/productSchema";

function mapImages(images: unknown): ProductImages {
    const raw = images as { main?: string; gallery?: string[] } | null;
    if (!raw || typeof raw.main !== "string") {
        return {main: "", gallery: []};
    }
    const gallery = Array.isArray(raw.gallery)
        ? raw.gallery.filter((u): u is string => typeof u === "string")
        : [];
    return {main: raw.main, gallery};
}

function mapSpecs(specs: unknown): ProductSpecs {
    if (specs === null || typeof specs !== "object") return {};
    return specs as ProductSpecs;
}

export async function findAllProducts(): Promise<Product[]> {
    const rows = await prisma.product.findMany({
        orderBy: {createdAt: "desc"},
    });
    return rows.map((row) => mapRowToProduct(row));
}

export function mapRowToProduct(row: {
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
    images: unknown;
    specs: unknown;
}): Product {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        price: row.price,
        currency: row.currency,
        stock: row.stock,
        sku: row.sku,
        category: row.category,
        brand: row.brand,
        images: mapImages(row.images),
        specs: mapSpecs(row.specs),
    };
}

export async function findProductById(id: string): Promise<Product | null> {
    const row = await prisma.product.findUnique({where: {id}});
    if (!row) return null;
    return mapRowToProduct(row);
}

export async function updateProduct(
    id: string,
    data: ProductUpdateInput,
): Promise<Product> {
    const {imageUrl, ...fields} = data;

    const current = await prisma.product.findUnique({where: {id}, select: {images: true}});
    const currentImages = mapImages(current?.images);
    const images = imageUrl !== undefined
        ? {...currentImages, main: imageUrl}
        : currentImages;

    const row = await prisma.product.update({where: {id}, data: {...fields, images}});
    return mapRowToProduct(row);
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
    const row = await prisma.product.findUnique({where: {slug}});
    if (!row) return null;
    return mapRowToProduct(row);
}

// Relation directionnelle `similar` (curée au seed) — voir productRepository d'origine.
export async function findSimilarProductsBySlug(slug: string): Promise<Product[]> {
    const row = await prisma.product.findUnique({
        where: {slug},
        include: {similar: {orderBy: {createdAt: "asc"}}},
    });
    if (!row) return [];
    return row.similar.map((p) => mapRowToProduct(p));
}