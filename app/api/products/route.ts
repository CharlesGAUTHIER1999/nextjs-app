import { NextResponse } from "next/server";
import { getProducts } from "@/domains/catalog/repository/productRepository";
import { getApiSecretKey } from "@/app/lib/serverEnv";

export async function GET() {
    // Démonstration : la variable server-only est accessible ici (Route Handler)
    // mais jamais exposée au navigateur
    const secret = getApiSecretKey();
    console.log("[API /products] Server secret loaded:", secret.slice(0, 5) + "…");

    const products = await getProducts();
    return NextResponse.json(products);
}