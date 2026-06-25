// --- Types ---

export type CartLine = {
    id: string; // id de la ligne (CartItem)
    productId: string;
    slug: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    quantity: number;
    lineTotal: number; // price * quantity
};

export type Cart = {
    id: string;
    lines: CartLine[];
    totalQuantity: number;
    totalPrice: number;
    currency: string;
};

// Nom du cookie qui porte l'id du panier (panier anonyme, sans auth).
// Partagé entre l'API route (écriture) et le CartSummary RSC (lecture).
export const CART_COOKIE = "cartId";

// --- Règles métier ---

const DEFAULT_CURRENCY = "EUR";

export function emptyCart(): Cart {
    return {
        id: "",
        lines: [],
        totalQuantity: 0,
        totalPrice: 0,
        currency: DEFAULT_CURRENCY,
    };
}

export function totalQuantity(lines: CartLine[]): number {
    return lines.reduce((n, l) => n + l.quantity, 0);
}

export function totalPrice(lines: CartLine[]): number {
    return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}
