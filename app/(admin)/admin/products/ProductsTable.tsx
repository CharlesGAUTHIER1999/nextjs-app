import Link from "next/link";
import {connection} from "next/server";
import {listProductsFromDb} from "@/domains/catalog/repository/productRepository";
import {formatPrice, formatStockLabel, isInStock,} from "@/domains/catalog/entity/product";

export async function ProductsTable() {
    await connection();
    const products = await listProductsFromDb();

    return products.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
            Aucun produit en base.
        </p>
    ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-800 bg-zinc-900/80">
                <tr>
                    <th className="px-4 py-3 font-medium text-zinc-400">Nom</th>
                    <th className="px-4 py-3 font-medium text-zinc-400">SKU</th>
                    <th className="px-4 py-3 font-medium text-zinc-400">Prix</th>
                    <th className="px-4 py-3 font-medium text-zinc-400">Stock</th>
                    <th className="px-4 py-3 font-medium text-zinc-400"/>
                </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                {products.map((product) => (
                    <tr key={product.id} className="transition hover:bg-zinc-900/50">
                        <td className="px-4 py-3">
                            <span className="font-medium text-white">{product.name}</span>
                            <span className="ml-2 text-zinc-500">
                  {product.brand} · {product.category}
                </span>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">{product.sku}</td>
                        <td className="px-4 py-3 text-zinc-300">
                            {formatPrice(product)}
                        </td>
                        <td className="px-4 py-3">
                <span
                    className={
                        isInStock(product) ? "text-emerald-400" : "text-zinc-500"
                    }
                >
                  {formatStockLabel(product)}
                </span>
                        </td>
                        <td className="px-4 py-3">
                            <Link
                                href={`/produit/${product.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-zinc-300"
                            >
                                Voir →
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}