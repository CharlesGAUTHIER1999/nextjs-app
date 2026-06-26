import Link from "next/link";
import { auth } from "@/auth";
import { NavUserMenu } from "./NavUserMenu";

export async function NavAuth() {
    const session = await auth();

    if (session?.user?.email) {
        return (
        <div className="flex items-center gap-4">
            {session.user.role === "admin" && (
                <Link
                    href="/admin"
                    className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-500 dark:hover:text-zinc-100"
                >
                    Admin
                </Link>
            )}
            <NavUserMenu name={session.user.name} email={session.user.email} />
        </div>
    );
    }

    return (
        <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
        >
            Connexion
        </Link>
    );
}