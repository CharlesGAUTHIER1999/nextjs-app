"use server";

import {hash} from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function registerAction(
    _prevState: string | null,
    formData: FormData,
): Promise<string | null> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const existing = await prisma.user.findUnique({where: {email}});
    if (existing) return "Un compte existe déjà avec cet email.";

    const hashed = await hash(password, 12);
    await prisma.user.create({
        data: {email, name: name || null, password: hashed},
    });

    redirect("/");
}