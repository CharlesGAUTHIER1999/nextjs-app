import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="mt-2 text-zinc-400">
                Bienvenue dans l’espace d’administration.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[{ label: "Produits", value: "—", href: "/admin/products" }].map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700 hover:bg-zinc-800/50"
                    >
                        <p className="text-sm text-zinc-500">{card.label}</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{card.value}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}