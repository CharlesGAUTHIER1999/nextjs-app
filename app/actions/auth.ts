"use server";

import {signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";

export async function loginAction(
    _prevState: string | null,
    formData: FormData,
): Promise<string | null> {
    try {
        await signIn("credentials", {...Object.fromEntries(formData), redirectTo: "/"});
        return null;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Email ou mot de passe incorrect.";
                default:
                    return "Une erreur est survenue. Réessayez.";
            }
        }
        throw error;
    }
}

export async function signOutAction() {
    await signOut({redirectTo: "/"});
}