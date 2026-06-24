import Link from "next/link";

export const metadata = {
    title: "Admin · News App",
    description: "Espace d'administration",
};

const nav = [
    {href: "/admin", label: "Dashboard"},
    {href: "/admin/products", label: "Products"},
];

export default function AdminLayout(props: LayoutProps<"/admin">) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/50">
                <div className="border-b border-zinc-800 px-4 py-5">
                    <Link
                        href="/admin"
                        className="text-lg font-semibold tracking-tight text-white"
                    >
                        Admin
                    </Link>
                    <p className="mt-0.5 text-xs text-zinc-500">News App</p>
                </div>
                <nav className="flex-1 space-y-0.5 p-3">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-zinc-800 p-3">
                    <Link
                        href="/"
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
                    >
                        ← Retour au site
                    </Link>
                </div>
            </aside>
            <div className="flex-1 overflow-auto">
                <div className="p-8">{props.children}</div>
            </div>
        </div>
    );
}