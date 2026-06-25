import React from "react";

export default function ProductLayout({
                                          children,
                                          similar,
                                          sponsored,
                                      }: {
    children: React.ReactNode;
    similar: React.ReactNode;
    sponsored: React.ReactNode;
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
            {similar}
            {sponsored}
        </div>
    );
}