import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST() {
    revalidateTag("mockshop", "max");
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, at: Date.now() });
}