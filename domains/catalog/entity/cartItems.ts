import type { Cart, CartItem } from "./cart";

/** Règle métier : extrait les items d'un panier, ou tableau vide si pas de panier. */
export function getItemsFromCart(cart: Cart | null): CartItem[] {
    return cart?.items ?? [];
}