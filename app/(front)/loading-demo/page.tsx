// Rendu à la demande pour que le fallback loading.tsx se déclenche à chaque visite.
export const dynamic = "force-dynamic";

async function getSlowData() {
    // Latence simulée pour illustrer l'état de chargement d'un Server Component async.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Données chargées après 2 secondes.";
}

export default async function LoadingDemoPage() {
    const message = await getSlowData();

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                Démo loading
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{message}</p>
        </div>
    );
}
