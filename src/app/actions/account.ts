"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const setPassword = async (password: string) => {    
    const res = await auth.api.setPassword({
        headers:  await headers(),
        body: {
            newPassword: password
        }
    });
    return res.status;
};