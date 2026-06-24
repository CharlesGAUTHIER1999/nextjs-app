import Image from "next/image";
import { prisma } from "@/lib/prisma";

// Lecture en base à chaque requête : le back-office doit refléter l'état réel du stock.
export const dynamic = "force-dynamic";

export default async function AdminProduits() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "asc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Produits</h1>
                <span className="text-sm text-zinc-500">
                    {products.length} référence{products.length > 1 ? "s" : ""}
                </span>
            </div>

            {products.length === 0 ? (
                <p className="mt-8 rounded-xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
                    Aucun produit en base. Lance le seed&nbsp;:{" "}
                    <code className="text-zinc-300">npx prisma db seed</code>
                </p>
            ) : (
                <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-900/60 text-xs uppercase tracking-wider text-zinc-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Produit</th>
                                <th className="px-4 py-3 font-medium">SKU</th>
                                <th className="px-4 py-3 font-medium">Catégorie</th>
                                <th className="px-4 py-3 text-right font-medium">Prix</th>
                                <th className="px-4 py-3 text-right font-medium">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {products.map((p) => {
                                const main = (p.images as { main?: string } | null)?.main;
                                return (
                                    <tr key={p.id} className="hover:bg-zinc-900/40">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                                                    {main && (
                                                        <Image
                                                            src={main}
                                                            alt={p.name}
                                                            fill
                                                            sizes="40px"
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-100">{p.name}</p>
                                                    <p className="text-xs text-zinc-500">{p.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                                            {p.sku}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-400">{p.category}</td>
                                        <td className="px-4 py-3 text-right tabular-nums text-zinc-200">
                                            {p.price.toLocaleString("fr-FR")} {p.currency}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span
                                                className={
                                                    p.stock > 0
                                                        ? "tabular-nums text-emerald-400"
                                                        : "tabular-nums text-red-400"
                                                }
                                            >
                                                {p.stock}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
