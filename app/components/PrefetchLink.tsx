"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import type { ReactNode } from "react";

export type PrefetchMode = "auto" | "hover";

export function PrefetchLink({
                                 href,
                                 mode,
                                 className,
                                 children,
                             }: {
    href: string;
    mode: PrefetchMode;
    className?: string;
    children: ReactNode;
}) {
    const router = useRouter();
    const didPrefetch = useRef(false);

    const handleHoverPrefetch = useCallback(() => {
        if (mode !== "hover" || didPrefetch.current) return;
        didPrefetch.current = true;
        router.prefetch(href);
    }, [href, mode, router]);

    return (
        <Link
            href={href}
            prefetch={mode === "auto"}
            onMouseEnter={handleHoverPrefetch}
            onFocus={handleHoverPrefetch}
            className={className}
        >
            {children}
        </Link>
    );
}