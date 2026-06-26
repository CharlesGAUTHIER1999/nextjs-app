import {Suspense} from "react";
import Image from "next/image";
import {notFound} from "next/navigation";
import {connection} from "next/server";
import {getProductById} from "@/domains/catalog/repository/productRepository";
import {ProductEditForm} from "./ProductEditForm";

async function ProductEditContent({params}: { params: Promise<{ id: string }> }) {
    await connection();
    const {id} = await params;
    const product = await getProductById(id);

    if (!product) notFound();

    return (
        <div>
            <div className="mb-8 flex items-start gap-6">
                {product.images.main && (
                    <Image
                        src={product.images.main}
                        alt={product.name}
                        width={160}
                        height={160}
                        className="rounded-lg object-cover"
                    />
                )}
                <div>
                    <h1 className="mb-1 text-xl font-semibold text-white">{product.name}</h1>
                    <p className="text-sm text-zinc-500">SKU : {product.sku}</p>
                    <p className="mt-1 max-w-sm truncate text-xs text-zinc-600">
                        {product.images.main}
                    </p>
                </div>
            </div>
            <ProductEditForm product={product}/>
        </div>
    );
}

export default function EditProductPage(props: PageProps<"/admin/products/[id]">) {
    return (
        <Suspense fallback={<p className="text-sm text-zinc-500">Chargement…</p>}>
            <ProductEditContent params={props.params}/>
        </Suspense>
    );
}