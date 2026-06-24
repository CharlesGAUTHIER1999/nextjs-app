import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CartProvider } from "../components/cart/CartContext";
import { CartSummary } from "../components/cart/CartSummary";

export default function FrontLayout(props: LayoutProps<"/">) {
    return (
        <CartProvider>
            <div className="flex min-h-screen flex-col">
                <Nav cartSummary={<CartSummary />} />
                <main className="flex-1">{props.children}</main>
                <Footer />
            </div>
        </CartProvider>
    );
}
