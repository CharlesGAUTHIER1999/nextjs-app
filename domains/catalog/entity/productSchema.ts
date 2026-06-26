import { z } from "zod";

export const productUpdateSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    price: z.coerce.number().positive("Le prix doit être positif"),
    stock: z.coerce.number().int().min(0, "Le stock ne peut pas être négatif"),
    category: z.string().min(1, "La catégorie est requise"),
    brand: z.string().min(1, "La marque est requise"),
    slug: z.string().min(1, "Le slug est requis").regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres, tirets)"),
    sku: z.string().min(1, "Le SKU est requis"),
    imageUrl: z.url("URL invalide").or(z.literal("")),
});

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;