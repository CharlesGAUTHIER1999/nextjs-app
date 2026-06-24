import Link from "next/link";
import type { ReactNode } from "react";

export function Nav({ cartSummary }: { cartSummary?: ReactNode }) {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" className="font-display text-2xl font-bold">
                    Gauthier App
                </Link>
                <div className="flex items-center gap-6">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:underline">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:underline">
                                À propos de nous
                            </Link>
                        </li>
                        <li>
                            <Link href="/loading-demo" className="hover:underline">
                                Démo loading
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin"
                                className="text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-500 dark:hover:text-zinc-100"
                            >
                                Admin
                            </Link>
                        </li>
                    </ul>
                    {cartSummary}
                </div>
            </nav>
        </header>
    );
}