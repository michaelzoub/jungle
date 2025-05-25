import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";

export async function POST() {
    try {
        //update with "Completed 🎉"
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        await collection.updateMany(
            {}, // Empty filter = all documents
            { $set: { status: "Completed 🎉" } } // Update operation
          );
        return NextResponse.json({})
    } catch (error) {
        return NextResponse.json({})
    }
}