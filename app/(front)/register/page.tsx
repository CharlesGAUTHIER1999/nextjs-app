import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-sm px-4 py-20">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Créer un compte
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Déjà inscrit ?{" "}
                <Link href="/login" className="font-medium underline hover:no-underline">
                    Se connecter
                </Link>
            </p>
            <RegisterForm />
        </div>
    );
}