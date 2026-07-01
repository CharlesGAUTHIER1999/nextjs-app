"use cache";

export async function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
            <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                © {year} {process.env.NEXT_PUBLIC_SITE_NAME}. Tous droits réservés.
            </div>
        </footer>
    );
}