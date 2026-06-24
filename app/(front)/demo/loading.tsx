// Fallback de route : affiché automatiquement par Next pendant que le Server
// Component async (page.tsx) suspend son rendu.
export default function Loading() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-400">
                Démo loading & error
            </h1>
            <p className="mt-6 animate-pulse text-lg text-zinc-500">Chargement…</p>
        </div>
    );
}
