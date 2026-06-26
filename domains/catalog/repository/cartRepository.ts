import type { Cart, CartItem } from "@/domains/catalog/entity/cart";
import { getItemsFromCart } from "@/domains/catalog/entity/cartItems";
import { findProductBySlug } from "@/domains/catalog/data/productData";
import {
    findCartById,
    findCartBySessionId,
    createCart,
    upsertCartItem,
    setCartItemQuantity,
    removeItemFromCart as removeItemFromCartInDb,
} from "@/domains/catalog/data/cartData";

export async function getCartById(id: string): Promise<Cart | null> {
    return findCartById(id);
}

/** Règle métier : retourne les items du panier pour un cartId (ou [] si null / panier inexistant). */
export async function getCartItems(cartId: string | null): Promise<CartItem[]> {
    if (!cartId) return getItemsFromCart(null);
    const cart = await findCartById(cartId);
    return getItemsFromCart(cart);
}

export async function getCartBySessionId(
    sessionId: string,
): Promise<Cart | null> {
    return findCartBySessionId(sessionId);
}

export async function createNewCart(sessionId?: string | null): Promise<Cart> {
    return createCart(sessionId);
}

/** Règle métier : résolution slug → productId puis ajout au panier. */
export async function addItemToCart(
    cartId: string,
    item: {
        slug: string;
        name: string;
        price: number;
        currency: string;
        quantity?: number;
    },
): Promise<Cart | null> {
    const product = await findProductBySlug(item.slug);
    if (!product) return null;
    const qty = item.quantity ?? 1;
    return upsertCartItem(
        cartId,
        product.id,
        item.name,
        item.price,
        item.currency,
        qty,
    );
}

/** Règle métier : si pas de panier (cartId null ou inexistant), en crée un puis ajoute l'article. Retourne { cart, cartId } ou null. */
export async function addItemToCartOrCreate(
    cartId: string | null,
    item: {
        slug: string;
        name: string;
        price: number;
        currency: string;
        quantity?: number;
    },
): Promise<{ cart: Cart; cartId: string } | null> {
    const product = await findProductBySlug(item.slug);
    if (!product) return null;

    let effectiveCartId = cartId;
    if (effectiveCartId) {
        const existing = await findCartById(effectiveCartId);
        if (!existing) effectiveCartId = null;
    }
    if (!effectiveCartId) {
        const newCart = await createCart();
        effectiveCartId = newCart.id;
    }

    const qty = item.quantity ?? 1;
    const cart = await upsertCartItem(
        effectiveCartId,
        product.id,
        item.name,
        item.price,
        item.currency,
        qty,
    );
    if (!cart) return null;
    return { cart, cartId: effectiveCartId };
}

/** Règle métier : résolution slug → productId ; si quantity <= 0 supprime la ligne, sinon met à jour la quantité. */
export async function updateItemQuantity(
    cartId: string,
    slug: string,
    quantity: number,
): Promise<Cart | null> {
    const product = await findProductBySlug(slug);
    if (!product) return null;
    if (quantity <= 0) return removeItemFromCartInDb(cartId, product.id);
    return setCartItemQuantity(cartId, product.id, quantity);
}

/** Règle métier : résolution slug → productId puis suppression de la ligne. */
export async function removeItemFromCart(
    cartId: string,
    slug: string,
): Promise<Cart | null> {
    const product = await findProductBySlug(slug);
    if (!product) return null;
    return removeItemFromCartInDb(cartId, product.id);
}