import React, {Suspense} from "react";
import {SimilarProducts} from "@/app/components/SimilarProducts";
import {SimilarSkeleton} from "@/app/components/SimilarSkeleton";
import {SponsoredProducts} from "@/app/components/SponsoredProducts";
import {SponsoredSkeleton} from "@/app/components/SponsoredSkeleton";

export default function ProductLayout({
                                          children,
                                          params,
                                      }: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
            <Suspense fallback={<SimilarSkeleton/>}>
                <SimilarProductsWrapper params={params}/>
            </Suspense>

            <Suspense fallback={<SponsoredSkeleton/>}>
                <SponsoredProducts limit={3} title="Vous aimerez aussi" linkToInternal/>
            </Suspense>
        </div>
    );
}

async function SimilarProductsWrapper({
                                          params,
                                      }: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
    return <SimilarProducts slug={slug}/>;
}