"use client";

import { useState } from "react";
import type { Product } from "@/domains/catalog/entity/product";
import { isInStock } from "@/domains/catalog/entity/product";
import { useCart } from "./CartContext";

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const inStock = isInStock(product);

    function handleClick() {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    }

    return (
        <button
            type="button"
            disabled={!inStock}
            onClick={handleClick}
            className="w-full rounded-xl bg-zinc-900 px-6 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
            {!inStock ? "Indisponible" : added ? "Ajouté ✓" : "Ajouter au panier"}
        </button>
    );
}
