import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        await collection.updateOne(
            { _id: body._id },
            { $set: { review: body.review } },
        );

        return NextResponse.json({  })
    } catch (error) {
        return NextResponse.json({  })
    }
}