import Link from "next/link";
import {Suspense} from "react";
import {CartSummary} from "@/app/components/CartSummary";
import { NavAuth } from "@/app/components/NavAuth";

export function Nav() {
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
                            <Link href="/demo" className="hover:underline">
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
                    <Suspense fallback={<div className="h-8 w-20" />}>
                        <NavAuth />
                    </Suspense>
                    <Suspense
                        fallback={
                            <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        }
                    >
                        <CartSummary />
                    </Suspense>
                </div>
            </nav>
        </header>
    );
}