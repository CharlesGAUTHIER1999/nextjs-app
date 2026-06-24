import type { ReactNode } from "react";

// Un template (≠ layout) est ré-instancié à chaque navigation : le composant est
// remonté, donc l'animation CSS d'entrée se rejoue à chaque changement de page front.
export default function FrontTemplate({ children }: { children: ReactNode }) {
    return <div className="animate-fade-in">{children}</div>;
}
