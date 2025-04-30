import { NextResponse } from "next/server";

export function GET() {
    try {

    } catch(error) {
        return NextResponse.json({ status: 400 })
    }
}