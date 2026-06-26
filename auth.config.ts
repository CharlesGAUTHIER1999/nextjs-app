import type {DefaultSession, NextAuthConfig} from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
    }

    interface Session {
        user: { role?: string } & DefaultSession["user"];
    }
}

export const authConfig = {
    // Requis en self-hosted (next start hors Vercel) : sans ça, Auth.js renvoie
    // UntrustedHost en production.
    trustHost: true,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({token, user}) {
            if (user) token.role = user.role;
            return token;
        },
        session({session, token}) {
            session.user.role = token.role as string | undefined;
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;