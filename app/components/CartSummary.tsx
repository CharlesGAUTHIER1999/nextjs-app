import { cookies } from "next/headers";
import { CART_COOKIE } from "@/domains/cart/entity/cart";
import { getCart } from "@/domains/cart/repository/cartRepository";

// Server Component : lit l'id de panier dans le cookie puis le panier en base.
// Lire un cookie bascule la route en rendu dynamique (request-time API).
export async function CartSummary() {
    const cartId = (await cookies()).get(CART_COOKIE)?.value;
    const cart = await getCart(cartId);

    return (
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700">
            <span aria-hidden>🛒</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {cart.totalQuantity}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
                · {cart.totalPrice.toLocaleString("fr-FR")} €
            </span>
        </div>
    );
}
