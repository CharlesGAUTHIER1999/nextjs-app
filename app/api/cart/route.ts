import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CART_COOKIE_NAME, CART_COOKIE_MAX_AGE } from "@/app/lib/cartCookie";
import {
    getCartItems,
    addItemToCartOrCreate,
} from "@/domains/catalog/repository/cartRepository";

export async function GET() {
    const cartId = (await cookies()).get(CART_COOKIE_NAME)?.value ?? null;
    const items = await getCartItems(cartId);
    return NextResponse.json({ items });
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value ?? null;

    const body = await request.json();
    const { slug, name, price, currency } = body as {
        slug: string;
        name: string;
        price: number;
        currency: string;
    };

    const result = await addItemToCartOrCreate(cartId, {
        slug,
        name,
        price,
        currency,
    });
    if (!result) {
        return NextResponse.json(
            { success: false, error: "Impossible d'ajouter au panier" },
            { status: 400 },
        );
    }

    if (cartId !== result.cartId) {
        cookieStore.set(CART_COOKIE_NAME, result.cartId, {
            httpOnly: true,
            path: "/",
            maxAge: CART_COOKIE_MAX_AGE,
            sameSite: "lax",
        });
    }
    return NextResponse.json({ success: true, items: result.cart.items });
}