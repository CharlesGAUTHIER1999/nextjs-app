import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CART_COOKIE } from "@/domains/cart/entity/cart";
import { addToCart } from "@/domains/cart/repository/cartRepository";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const productId = body?.productId;
    if (typeof productId !== "string") {
        return NextResponse.json({ error: "productId requis" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const currentId = cookieStore.get(CART_COOKIE)?.value;

    const { cartId, cart } = await addToCart(currentId, productId);

    // Nouveau panier : on pose le cookie httpOnly pour les requêtes suivantes.
    if (cartId !== currentId) {
        cookieStore.set(CART_COOKIE, cartId, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: COOKIE_MAX_AGE,
        });
    }

    return NextResponse.json({
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
    });
}
