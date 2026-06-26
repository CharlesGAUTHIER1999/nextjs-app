import { Suspense } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CartSummary } from "../components/CartSummary";

export default function FrontLayout(props: LayoutProps<"/">) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* CartSummary lit cookies() (dynamique) : sous cacheComponents il DOIT être
                isolé dans un <Suspense> pour ne pas bloquer le prérendu du reste (PPR). */}
            <Nav
                cartSummary={
                    <Suspense
                        fallback={
                            <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        }
                    >
                        <CartSummary />
                    </Suspense>
                }
            />
            <main className="flex-1">{props.children}</main>
            <Footer />
        </div>
    );
}
