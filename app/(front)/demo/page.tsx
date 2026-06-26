import { connection } from "next/server";
import { CrashButton } from "./CrashButton";

async function getSlowData() {
    // Latence simulée : la page « suspend » pendant 2s → loading.tsx s'affiche.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Données chargées après 2 secondes.";
}

export default async function DemoPage() {
    // Rendu à la demande (cacheComponents) : le fallback loading.tsx s'affiche à chaque visite.
    await connection();
    const message = await getSlowData();

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                Démo loading & error
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{message}</p>

            <div className="mt-10">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Clique pour déclencher une erreur et voir le rendu de{" "}
                    <code>error.tsx</code> :
                </p>
                <div className="mt-3">
                    <CrashButton />
                </div>
            </div>
        </div>
    );
}
