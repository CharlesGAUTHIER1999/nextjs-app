import React, {Suspense} from "react";
import {PageTransition} from "./PageTransition";

export default function FrontTemplate({
                                          children,
                                      }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={null}>
            <PageTransition>{children}</PageTransition>
        </Suspense>
    );
}