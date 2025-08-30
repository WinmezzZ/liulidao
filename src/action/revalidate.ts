"use server";

import { revalidatePath } from "next/cache";

export const  clientRevalidatePath = async (originalPath: string, type?: "layout" | "page") => {
    revalidatePath(originalPath, type);
}
