"use client";

import { useState } from "react";
import { notifyCartUpdated } from "@/app/lib/cartEvents";

type Props = {
    disabled: boolean;
    slug: string;
    name: string;
    price: number;
    currency: string;
};

export function AddToCartButton({
                                    disabled,
                                    slug,
                                    name,
                                    price,
                                    currency,
                                }: Props) {
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    //debugger;

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, name, price, currency }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success) {
            notifyCartUpdated();
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    return (
        <button
            type="button"
            disabled={disabled || loading}
            onClick={handleClick}
            className="w-full rounded-xl bg-zinc-900 px-6 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
            {disabled
                ? "Indisponible"
                : loading
                    ? "Ajout…"
                    : added
                        ? "Ajouté !"
                        : "Ajouter au panier"}
        </button>
    );
}