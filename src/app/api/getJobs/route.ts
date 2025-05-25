import { connectToDatabase } from "@/utils/mongo";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        const markers = await collection.find().toArray(); //used to be await collection.find({ status: { $ne: "Completed 🎉" } }).toArray();
        console.log(markers);
        return NextResponse.json({ status: 200, body: markers })
    } catch(error) {
        return NextResponse.json({ status: 400 })
    }
}