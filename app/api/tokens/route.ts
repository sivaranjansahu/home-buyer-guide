import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from("quota").select().eq('user_id', '1e521d9b-89b3-4e98-95c3-223b6d2257a5').single();
    return NextResponse.json(data)
}