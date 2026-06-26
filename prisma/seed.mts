import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { Product } from "@/domains/catalog/entity/product";

const __dirname = dirname(fileURLToPath(import.meta.url));

const products = JSON.parse(
    readFileSync(join(__dirname, "../domains/catalog/data/products.json"), "utf-8")
) as Product[];

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const SIMILAR_COUNT = 4;

// Calcule des slugs similaires pour un produit : même catégorie en priorité,
// puis on complète avec d'autres produits pour atteindre SIMILAR_COUNT.
function pickSimilarSlugs(target: Product, all: Product[]): string[] {
    const others = all.filter((p) => p.slug !== target.slug);
    const sameCategory = others.filter((p) => p.category === target.category);
    const rest = others.filter((p) => p.category !== target.category);
    return [...sameCategory, ...rest].slice(0, SIMILAR_COUNT).map((p) => p.slug);
}

async function main() {
    for (const p of products) {
        const data = {
            name: p.name,
            description: p.description,
            price: p.price,
            currency: p.currency,
            stock: p.stock,
            sku: p.sku,
            category: p.category,
            brand: p.brand,
            images: p.images,
            specs: p.specs,
        };

        // upsert => seed rejouable sans dupliquer (clé = slug unique)
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: data,
            create: { slug: p.slug, ...data },
        });
    }

    // Une fois tous les produits en base, on (re)branche les produits similaires.
    // `set` remplace les liens existants => seed rejouable sans accumuler.
    for (const p of products) {
        const similarSlugs = pickSimilarSlugs(p, products);
        await prisma.product.update({
            where: { slug: p.slug },
            data: {
                similar: { set: similarSlugs.map((slug) => ({ slug })) },
            },
        });
    }

    const count = await prisma.product.count();
    console.log(`✓ Seed terminé : ${count} produits en base (avec produits similaires).`);
}

main()
    .catch((e) => {
        console.error("✗ Seed échoué :", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
