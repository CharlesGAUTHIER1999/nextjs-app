"use server";

import {z} from "zod";
import {revalidatePath, revalidateTag} from "next/cache";
import {productUpdateSchema} from "@/domains/catalog/entity/productSchema";
import {updateProduct} from "@/domains/catalog/repository/productRepository";

export type UpdateProductState = {
    errors?: Partial<Record<string, string[]>>;
    message?: string;
    success?: boolean;
};

export async function updateProductAction(
    id: string,
    _prevState: UpdateProductState,
    formData: FormData,
): Promise<UpdateProductState> {
    const shouldSimulateError = formData.get("simulateError") === "1";
    if (shouldSimulateError) {
        return {
            success: false,
            message: "Erreur simulee: impossible de mettre a jour le produit.",
        };
    }

    const raw = Object.fromEntries(formData);
    const parsed = productUpdateSchema.safeParse(raw);

    if (!parsed.success) {
        return {errors: z.flattenError(parsed.error).fieldErrors};
    }

    try {
        await updateProduct(id, parsed.data);
    } catch {
        return {
            success: false,
            message: "Une erreur serveur est survenue. Reessayez.",
        };
    }

    revalidatePath("/admin/produits");
    revalidateTag("catalog", "max");

    return {success: true};
}