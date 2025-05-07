import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { hash } from "@/utils/hash";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("login"); 
        const all = await collection.find({}).toArray();

        if (!all || all.length === 0) {
            return NextResponse.json({ status: 404, message: "No data found" });
        }

        //hash:
        const hashObject = hash(body.username, body.password);

        return NextResponse.json({ status: 200, body: { db: all[0], username: hashObject.username, password: hashObject.password } });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ 
            status: 500, 
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}