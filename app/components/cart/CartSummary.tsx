"use client";

import { useCart } from "./CartContext";

export function CartSummary() {
    const { totalQuantity, totalPrice } = useCart();

    return (
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700">
            <span aria-hidden>🛒</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {totalQuantity}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
                · {totalPrice.toLocaleString("fr-FR")} €
            </span>
        </div>
    );
}
