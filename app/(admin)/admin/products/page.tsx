import {Suspense} from "react";
import {ProductsTable} from "./ProductsTable";

export default function AdminProduits() {
    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Produits</h1>
            </div>
            <Suspense
                fallback={
                    <p className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
                        Chargement…
                    </p>
                }
            >
                <ProductsTable/>
            </Suspense>
        </div>
    );
}