import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-sm px-4 py-20">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Connexion
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Pas encore de compte ?{" "}
                <Link href="/register" className="font-medium underline hover:no-underline">
                    S&apos;inscrire
                </Link>
            </p>
            <LoginForm />
        </div>
    );
}