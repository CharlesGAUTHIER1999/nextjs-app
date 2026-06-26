"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/domains/catalog/entity/product";
import {
    formatSpecLabel,
    formatSpecValue,
} from "@/domains/catalog/entity/product";

const TAB_DESCRIPTION = "description";
const TAB_SPECS = "specs";
const VALID_TABS = [TAB_DESCRIPTION, TAB_SPECS] as const;

type Tab = (typeof VALID_TABS)[number];

function parseTab(param: string | null): Tab {
    return VALID_TABS.includes(param as Tab) ? (param as Tab) : TAB_DESCRIPTION;
}

export function ProductTabs({
                                slug,
                                product,
                            }: {
    slug: string;
    product: Product;
}) {
    const searchParams = useSearchParams();
    const tab = parseTab(searchParams.get("tab"));

    return (
        <>
            <div className="mt-4 flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
                <Link
                    href={`/produit/${slug}?tab=${TAB_DESCRIPTION}`}
                    className={`border-b-2 px-2 pb-2 text-sm font-medium transition-colors ${
                        tab === TAB_DESCRIPTION
                            ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                            : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                    }`}
                >
                    Description
                </Link>
                <Link
                    href={`/produit/${slug}?tab=${TAB_SPECS}`}
                    className={`border-b-2 px-2 pb-2 text-sm font-medium transition-colors ${
                        tab === TAB_SPECS
                            ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                            : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                    }`}
                >
                    Caractéristiques
                </Link>
            </div>
            <div className="mt-4 text-zinc-600 dark:text-zinc-400">
                {tab === TAB_DESCRIPTION && (
                    <p className="text-lg">{product.description}</p>
                )}
                {tab === TAB_SPECS && (
                    <dl className="space-y-2 text-sm">
                        {Object.entries(product.specs).map(([key, value]) =>
                            value !== undefined && value !== null ? (
                                <div key={key} className="flex justify-between gap-4">
                                    <dt className="text-zinc-500 dark:text-zinc-400">
                                        {formatSpecLabel(key)}
                                    </dt>
                                    <dd>{formatSpecValue(value)}</dd>
                                </div>
                            ) : null
                        )}
                        {Object.keys(product.specs).length === 0 && (
                            <p className="text-zinc-500">Aucune caractéristique.</p>
                        )}
                    </dl>
                )}
            </div>
        </>
    );
}