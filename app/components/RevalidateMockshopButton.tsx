"use client";

import {useRouter} from "next/navigation";

export function RevalidateMockshopButton() {
    const router = useRouter();

    async function handleClick() {
        await fetch("/api/revalidate-mockshop", {
            method: "POST",
            cache: "no-store",
        });
        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="ml-2 rounded border border-zinc-300 px-2 py-0.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
            Actualiser
        </button>
    );
}