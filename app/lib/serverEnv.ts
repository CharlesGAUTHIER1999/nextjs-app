/**
 * Variables d'environnement server-only.
 * Ce fichier ne doit être importé que depuis des Server Components ou Route Handlers.
 * Les variables sans préfixe NEXT_PUBLIC_ ne sont jamais exposées au navigateur.
 */
export function getApiSecretKey(): string {
    const key = process.env.API_SECRET_KEY;
    if (!key) {
        throw new Error("API_SECRET_KEY is not defined");
    }
    return key;
}