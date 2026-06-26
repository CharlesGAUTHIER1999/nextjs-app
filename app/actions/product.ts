"use server";

import {z} from "zod";
import {revalidatePath} from "next/cache";
import {productUpdateSchema} from "@/domains/catalog/entity/productSchema";
import {updateProduct} from "@/domains/catalog/repository/productRepository";

export type UpdateProductState = {
    errors?: Partial<Record<string, string[]>>;
    success?: boolean;
};

export async function updateProductAction(
    id: string,
    _prevState: UpdateProductState,
    formData: FormData,
): Promise<UpdateProductState> {
    const raw = Object.fromEntries(formData);
    const parsed = productUpdateSchema.safeParse(raw);

    if (!parsed.success) {
        return {errors: z.flattenError(parsed.error).fieldErrors};
    }

    await updateProduct(id, parsed.data);

    revalidatePath("/admin/products");

    return {success: true};
}