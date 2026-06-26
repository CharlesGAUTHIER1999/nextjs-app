"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Product } from "@/domains/catalog/entity/product";
import { isInStock } from "@/domains/catalog/entity/product";

export function AddToCartButton({ product }: { product: Product }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [added, setAdded] = useState(false);
    const inStock = isInStock(product);

    async function handleClick() {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: product.id }),
        });
        if (!res.ok) return;

        setAdded(true);
        setTimeout(() => setAdded(false), 1200);

        // Re-rend les Server Components (dont le CartSummary du layout)
        // sans rechargement complet : c'est la mise à jour de l'ajout.
        startTransition(() => router.refresh());
    }

    return (
        <button
            type="button"
            disabled={!inStock || isPending}
            onClick={handleClick}
            className="w-full rounded-xl bg-zinc-900 px-6 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
            {!inStock
                ? "Indisponible"
                : isPending
                  ? "Ajout…"
                  : added
                    ? "Ajouté ✓"
                    : "Ajouter au panier"}
        </button>
    );
}
