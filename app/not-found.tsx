import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

export default async function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <Suspense>
                <Nav />
            </Suspense>
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                            404
                        </h1>
                        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                            Cette page n&apos;existe pas.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-block rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </div>
            </main>
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}