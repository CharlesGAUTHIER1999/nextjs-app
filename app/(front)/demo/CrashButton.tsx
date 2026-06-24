"use client";

import { useState } from "react";

// Déclencheur d'erreur pour la démo : au clic, le composant lève une exception
// pendant son rendu → elle remonte jusqu'à l'error boundary (error.tsx) voisine.
// reset() depuis error.tsx remonte ce composant, qui repart donc à `false`.
export function CrashButton() {
    const [boom, setBoom] = useState(false);

    if (boom) {
        throw new Error("Erreur de démonstration déclenchée volontairement.");
    }

    return (
        <button
            type="button"
            onClick={() => setBoom(true)}
            className="rounded-xl border border-red-500/40 px-5 py-2.5 font-medium text-red-500 transition hover:bg-red-500/10"
        >
            Provoquer une erreur
        </button>
    );
}
