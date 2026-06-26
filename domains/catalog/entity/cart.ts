// --- Types ---

export type CartItem = {
    slug: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
};

/** Panier persistant : id et sessionId pour la DB, items en domaine */
export type Cart = {
    id: string;
    sessionId?: string | null;
    items: CartItem[];
    createdAt?: Date;
    updatedAt?: Date;
};

// --- Règles métier ---

export function addItemToCart(
    items: CartItem[],
    item: Omit<CartItem, "quantity">,
): CartItem[] {
    const existing = items.find((i) => i.slug === item.slug);
    if (existing) {
        return items.map((i) =>
            i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i,
        );
    }
    return [...items, { ...item, quantity: 1 }];
}

export function getTotalArticles(items: CartItem[]): number {
    return items.reduce((acc, i) => acc + i.quantity, 0);
}

export function getTotalPrice(items: CartItem[]): number {
    return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
}

export function getCartCurrency(items: CartItem[]): string | undefined {
    return items[0]?.currency;
}