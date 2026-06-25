import type {SponsoredProduct} from "@/domains/catalog/entity/sponsoredProduct";
import {
    fetchMockShopProducts,
    fetchMockShopProductByHandle,
} from "@/domains/catalog/data/mockShop";

export async function getSponsoredProducts(
    limit: number = 6
): Promise<SponsoredProduct[]> {
    return fetchMockShopProducts(limit);
}

export async function getSponsoredProductByHandle(
    handle: string
): Promise<SponsoredProduct | null> {
    return fetchMockShopProductByHandle(handle);
}