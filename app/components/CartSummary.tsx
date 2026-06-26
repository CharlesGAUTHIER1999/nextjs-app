"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/domains/catalog/entity/cart";
import {
    getCartCurrency,
    getTotalArticles,
    getTotalPrice,
} from "@/domains/catalog/entity/cart";
import { CART_UPDATED_EVENT } from "@/app/lib/cartEvents";

export function CartSummary() {
    const [items, setItems] = useState<CartItem[]>([]);

    const fetchCart = () => {
        fetch("/api/cart")
            .then((res) => res.json())
            .then((data) => setItems(data.items ?? []))
            .catch(() => setItems([]));
    };

    useEffect(() => {
        fetchCart();
        const onCartUpdated = () => fetchCart();
        window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
        return () => window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
    }, []);

    const currency = getCartCurrency(items) ?? "EUR";
    const totalArticles = getTotalArticles(items);
    const totalPrice = getTotalPrice(items);

    if (totalArticles === 0) return null;

    return (
        <span className="rounded-full bg-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
      {totalArticles} article{totalArticles > 1 ? "s" : ""} · {totalPrice.toFixed(2)} {currency}
    </span>
    );
}