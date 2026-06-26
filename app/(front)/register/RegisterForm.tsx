"use client";

import {useActionState} from "react";
import {registerAction} from "@/app/actions/register";

export function RegisterForm() {
    const [error, action, pending] = useActionState(registerAction, null);

    return (
        <form action={action} className="mt-8 space-y-4">
            {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </p>
            )}

            <div>
                <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    Nom <span className="text-zinc-400">(optionnel)</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                    placeholder="Jean Dupont"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                    placeholder="vous@exemple.fr"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    Mot de passe
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                {pending ? "Création…" : "Créer un compte"}
            </button>
        </form>
    );
}