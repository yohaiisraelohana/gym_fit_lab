"use server"
import { headers } from "next/headers"

export async function getFullPathName() : Promise<string> {
    return headers().get("referer") as string;
}