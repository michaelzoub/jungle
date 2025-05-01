import { connectToDatabase } from "@/utils/mongo";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("markers");
        const markers = await collection.find().toArray();
        return NextResponse.json({ status: 200, body: markers })
    } catch(error) {
        return NextResponse.json({ status: 400 })
    }
}