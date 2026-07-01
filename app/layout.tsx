import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { WebVitals } from "./components/WebVitals";

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
    title: {
        default: "Gauthier App",
        template: "%s | Gauthier App",
    },
    description:
        "Découvrez notre sélection de véhicules automobiles performants et de luxe",
    keywords: ["ecommerce", "véhicules", "automobile", "performant", "luxe"],
    openGraph: {
        type: "website",
        locale: "fr_FR",
        siteName: "News App",
        title: "News App",
        description:
            "Découvrez notre sélection de véhicules automobiles performants et de luxe.",
    },
    robots: {
        index: true,
        follow: true,
    },
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
        <WebVitals />
        {children}
        </body>
        </html>
    );
}
