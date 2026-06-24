// Fallback affiché automatiquement par Next pendant le rendu du Server Component
// async voisin (page.tsx), via le boundary <Suspense> implicite de la route.
export default function Loading() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-400">
                Démo loading
            </h1>
            <p className="mt-6 animate-pulse text-lg text-zinc-500">Chargement…</p>
        </div>
    );
}
