import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Police d'affichage auto-hébergée (next/font/local) : aucun appel réseau tiers
// au runtime, donc pas de FOUT/CLS. Fichier variable (poids 400→700).
const dancingScript = localFont({
    src: "./fonts/DancingScript.woff2",
    variable: "--font-dancing",
    weight: "400 700",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gauthier App",
    description: "Gauthier App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} min-h-screen antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
