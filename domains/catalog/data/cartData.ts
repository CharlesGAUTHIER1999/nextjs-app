import { prisma } from "@/lib/prisma";
import type { Cart, CartItem } from "@/domains/catalog/entity/cart";

type CartRow = {
    id: string;
    sessionId: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: Array<{
        name: string;
        price: number;
        currency: string;
        quantity: number;
        product: { slug: string };
    }>;
};

function mapPrismaCartToDomain(cart: CartRow): Cart {
    const items: CartItem[] = cart.items.map((item) => ({
        slug: item.product.slug,
        name: item.name,
        price: item.price,
        currency: item.currency,
        quantity: item.quantity,
    }));
    return {
        id: cart.id,
        sessionId: cart.sessionId,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
}

export async function findCartById(id: string): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
        where: { id },
        include: { items: { include: { product: true } } },
    });
    if (!cart) return null;
    return mapPrismaCartToDomain(cart);
}

export async function findCartBySessionId(
    sessionId: string
): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({
        where: { sessionId },
        include: { items: { include: { product: true } } },
        orderBy: { updatedAt: "desc" },
    });
    if (!cart) return null;
    return mapPrismaCartToDomain(cart);
}

export async function createCart(sessionId?: string | null): Promise<Cart> {
    const cart = await prisma.cart.create({
        data: { sessionId: sessionId ?? undefined },
        include: { items: { include: { product: true } } },
    });
    return mapPrismaCartToDomain(cart);
}

/** Accès brut : upsert une ligne panier par cartId + productId. */
export async function upsertCartItem(
    cartId: string,
    productId: string,
    name: string,
    price: number,
    currency: string,
    quantity: number
): Promise<Cart | null> {
    await prisma.cartItem.upsert({
        where: {
            cartId_productId: { cartId, productId },
        },
        create: {
            cartId,
            productId,
            name,
            price,
            currency,
            quantity,
        },
        update: { quantity: { increment: quantity } },
    });
    return findCartById(cartId);
}

/** Accès brut : met à jour la quantité d'une ligne (productId). */
export async function setCartItemQuantity(
    cartId: string,
    productId: string,
    quantity: number
): Promise<Cart | null> {
    await prisma.cartItem.updateMany({
        where: { cartId, productId },
        data: { quantity },
    });
    return findCartById(cartId);
}

/** Accès brut : supprime une ligne panier par cartId + productId. */
export async function removeItemFromCart(
    cartId: string,
    productId: string
): Promise<Cart | null> {
    await prisma.cartItem.deleteMany({
        where: { cartId, productId },
    });
    return findCartById(cartId);
}