import { prisma } from "@/lib/prisma";
import type { ProductImages } from "@/domains/catalog/entity/product";
import {
    type Cart,
    type CartLine,
    emptyCart,
    totalPrice,
    totalQuantity,
} from "@/domains/cart/entity/cart";

// Recompose un Cart métier (lignes + totaux) à partir des lignes + produits joints.
function toCart(
    id: string,
    items: {
        id: string;
        quantity: number;
        product: {
            id: string;
            slug: string;
            name: string;
            price: number;
            currency: string;
            images: unknown;
        };
    }[]
): Cart {
    const lines: CartLine[] = items.map((item) => ({
        id: item.id,
        productId: item.product.id,
        slug: item.product.slug,
        name: item.product.name,
        price: item.product.price,
        currency: item.product.currency,
        image: (item.product.images as ProductImages).main,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity,
    }));

    return {
        id,
        lines,
        totalQuantity: totalQuantity(lines),
        totalPrice: totalPrice(lines),
        currency: lines[0]?.currency ?? emptyCart().currency,
    };
}

const includeItems = {
    items: {
        orderBy: { createdAt: "asc" },
        include: { product: true },
    },
} as const;

// Lecture du panier (côté RSC). Sans id de cookie, on renvoie un panier vide.
export async function getCart(cartId: string | undefined): Promise<Cart> {
    if (!cartId) return emptyCart();

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: includeItems,
    });
    if (!cart) return emptyCart();

    return toCart(cart.id, cart.items);
}

// Ajout d'un produit au panier (côté API route POST).
// Crée le panier si besoin, incrémente la quantité si le produit y est déjà.
// Renvoie l'id du panier (à reposer en cookie) + le panier à jour.
export async function addToCart(
    cartId: string | undefined,
    productId: string,
    quantity = 1
): Promise<{ cartId: string; cart: Cart }> {
    // On (ré)utilise le panier du cookie s'il existe encore, sinon on en crée un.
    const existing = cartId
        ? await prisma.cart.findUnique({ where: { id: cartId } })
        : null;
    const cart = existing ?? (await prisma.cart.create({ data: {} }));

    await prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: { increment: quantity } },
        create: { cartId: cart.id, productId, quantity },
    });

    return { cartId: cart.id, cart: await getCart(cart.id) };
}
