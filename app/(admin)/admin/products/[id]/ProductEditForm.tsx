"use client";

import { useActionState } from "react";
import { useCallback } from "react";
import { updateProductAction, type UpdateProductState } from "@/app/actions/product";
import type { Product } from "@/domains/catalog/entity/product";

function Field({
                   label,
                   name,
                   defaultValue,
                   errors,
                   type = "text",
                   textarea = false,
               }: {
    label: string;
    name: string;
    defaultValue: string | number;
    errors?: string[];
    type?: string;
    textarea?: boolean;
}) {
    const cls =
        "w-full rounded-lg border bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 " +
        (errors?.length
            ? "border-red-500 focus:ring-red-500"
            : "border-zinc-700 focus:ring-zinc-500");

    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                {label}
            </label>
            {textarea ? (
                <textarea
                    name={name}
                    defaultValue={defaultValue}
                    rows={4}
                    className={cls}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    className={cls}
                />
            )}
            {errors?.map((e) => (
                <p key={e} className="mt-1 text-xs text-red-400">
                    {e}
                </p>
            ))}
        </div>
    );
}

export function ProductEditForm({ product }: { product: Product }) {
    const boundAction = useCallback(
        (prevState: UpdateProductState, formData: FormData) =>
            updateProductAction(product.id, prevState, formData),
        [product.id],
    );

    const [state, action, pending] = useActionState(boundAction, {});

    return (
        <form action={action} className="space-y-5">
            {state.message && (
                <p aria-live="polite" className="rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-300">
                    {state.message}
                </p>
            )}

            {state.success && (
                <p className="rounded-lg bg-emerald-900/30 px-4 py-3 text-sm text-emerald-400">
                    Produit mis à jour avec succès.
                </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nom" name="name" defaultValue={product.name} errors={state.errors?.name} />
                <Field label="Slug" name="slug" defaultValue={product.slug} errors={state.errors?.slug} />
                <Field label="SKU" name="sku" defaultValue={product.sku} errors={state.errors?.sku} />
                <Field label="Marque" name="brand" defaultValue={product.brand} errors={state.errors?.brand} />
                <Field label="Catégorie" name="category" defaultValue={product.category} errors={state.errors?.category} />
                <Field label="Prix (€)" name="price" type="number" defaultValue={product.price} errors={state.errors?.price} />
                <Field label="Stock" name="stock" type="number" defaultValue={product.stock} errors={state.errors?.stock} />
            </div>

            <Field
                label="Description"
                name="description"
                defaultValue={product.description}
                errors={state.errors?.description}
                textarea
            />

            <Field
                label="URL de l'image principale"
                name="imageUrl"
                defaultValue={product.images.main}
                errors={state.errors?.imageUrl}
            />

            <div className="flex flex-wrap gap-3">
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-60"
                >
                    {pending ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                    type="submit"
                    name="simulateError"
                    value="1"
                    disabled={pending}
                    className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-950/40 disabled:opacity-60"
                >
                    Simuler une erreur serveur
                </button>
            </div>
        </form>
    );
}