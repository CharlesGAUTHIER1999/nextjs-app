import { Suspense } from "react";

// Rendu à la demande pour que le streaming se rejoue à chaque visite.
export const dynamic = "force-dynamic";

async function SlowData() {
    // Latence simulée : ce composant « suspend » pendant son chargement.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Données chargées après 2 secondes.
        </p>
    );
}

export default function DemoPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                Démo loading
            </h1>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                Le titre s’affiche immédiatement ; seul le bloc ci-dessous est suspendu.
            </p>

            <Suspense
                fallback={
                    <p className="mt-6 animate-pulse text-lg text-zinc-500">
                        Chargement…
                    </p>
                }
            >
                <SlowData />
            </Suspense>
        </div>
    );
}
