import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { statuses } from "@/app/data/statuses";
import { nodeMailer } from "@/utils/sendToEmail";
import { reviewEmail } from "@/utils/sendReviewEmail";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        console.log("Body ID:", body._id);
        //change from "Completed" to status[3]
        const bodyId = new ObjectId(body._id);
        const result = await collection.findOneAndUpdate(
            { _id: bodyId  },
            { $set: { status: statuses[3] } },
            { returnDocument: 'after' } 
        );
        console.log("RESULT:", result);

        //send email to user
        //TODO: we need a link where users can post reviews
        await reviewEmail(result.customer.email, "Job review", `How did you find the service? Please leave a review by clicking on this link: https://junglandscape.com/review/${body._id}`)

        return NextResponse.json({ status: 200 });
    } catch(error) {
        return NextResponse.json({ status: 500 })
    }
}