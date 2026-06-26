"use client";

import {useRef, useState} from "react";
import {signOutAction} from "@/app/actions/auth";

function trigram(name: string | null | undefined, email: string): string {
    if (name) {
        return name
            .split(/\s+/)
            .map((w) => w[0])
            .join("")
            .slice(0, 3)
            .toUpperCase();
    }
    return email.slice(0, 3).toUpperCase();
}

export function NavUserMenu({
                                name,
                                email,
                            }: {
    name: string | null | undefined;
    email: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
                {trigram(name, email)}
            </button>

            {open && (
                <div
                    className="absolute right-0 top-10 z-10 w-40 rounded-lg border border-zinc-200 bg-white py-1 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                    <p className="truncate px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                        {email}
                    </p>
                    <hr className="my-1 border-zinc-100 dark:border-zinc-800"/>
                    <form action={signOutAction}>
                        <button
                            type="submit"
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                            Se déconnecter
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}