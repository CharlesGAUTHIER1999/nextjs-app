import type {
    Product,
    ProductImages,
    ProductSpecs,
} from "@/domains/catalog/entity/product";
import type { Product as PrismaProduct } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Prisma stocke `images` et `specs` en colonnes Json (type `unknown` côté client).
// On les recolle ici sur les types métier pour le reste de l'app.
function toEntity(row: PrismaProduct): Product {
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
        images: row.images as ProductImages,
        specs: row.specs as ProductSpecs,
    };
}

export async function getProducts(): Promise<Product[]> {
    const rows = await prisma.product.findMany({
        orderBy: { createdAt: "asc" },
    });
    return rows.map(toEntity);
}

export async function getProductBySlug(
    slug: string
): Promise<Product | undefined> {
    const row = await prisma.product.findUnique({ where: { slug } });
    return row ? toEntity(row) : undefined;
}
