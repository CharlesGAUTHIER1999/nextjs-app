import Link from "next/link";

// 404 globale : rendue par Next pour toute route non matchée, ainsi que lors d'un
// appel à notFound(). Elle vit dans le root layout (pas (front)) → pas de Nav/Footer,
// d'où un lien de retour explicite.
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <p className="font-display text-8xl font-bold text-zinc-900 dark:text-zinc-100">
                404
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
                Page introuvable
            </h1>
            <p className="mt-3 max-w-md text-zinc-500 dark:text-zinc-400">
                Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
            </p>
            <Link
                href="/"
                className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                Retour à l’accueil
            </Link>
        </div>
    );
}
