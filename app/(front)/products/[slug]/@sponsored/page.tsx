import {SponsoredProducts} from "@/app/components/SponsoredProducts";

export default async function SponsoredSlot() {
    return (
        <SponsoredProducts
            limit={3}
            title="Vous aimerez aussi"
            linkToInternal
        />
    );
}