"use client";

// Une error boundary App Router est OBLIGATOIREMENT un Client Component :
// elle a besoin d'état/d'interactivité (le bouton de réessai).
import { useEffect } from "react";

export default function DemoError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // En vrai : remonter l'erreur à un service de monitoring (Sentry…).
        console.error(error);
    }, [error]);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-red-500">
                Oups, une erreur est survenue
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                {error.message}
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                Réessayer
            </button>
        </div>
    );
}
