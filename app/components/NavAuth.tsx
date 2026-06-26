import Link from "next/link";
import {auth} from "@/auth";
import {NavUserMenu} from "./NavUserMenu";

export async function NavAuth() {
    const session = await auth();

    if (session?.user?.email) {
        return (
            <NavUserMenu name={session.user.name} email={session.user.email}/>
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