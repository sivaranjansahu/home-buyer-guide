import { NextRequest, NextResponse } from 'next/server';
import { generateEbook } from '../book';

export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || "127.0.0.1";

    // Create a JSON response
    const jsonResponse = { a: 2 };
    const bookContent = await generateEbook([{
        title: "life of bugs",
        subsections: ["birth", "death"]
    }])

    // Send the response
    return NextResponse.json(bookContent, { status: 200 });
}
