import { ratelimit } from "@/app/redis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const ip = req.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
        ip
    );

    const obj = { remaining: remaining };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: "application/json",
    });
    if (!success) {
        console.log("you cannot post more than 1 time in 60 seconds")
        return new Response(blob, { status: 429 });

    }else{
        return new Response(blob, { status: 200 });
    }
}