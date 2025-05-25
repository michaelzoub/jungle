import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { statuses } from "@/app/data/statuses";
import { nodeMailer } from "@/utils/sendToEmail";
import { reviewEmail } from "@/utils/sendReviewEmail";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        //change from "Completed" to status[3]
        await collection.updateOne(
            { _id: body._id },
            { $set: { status: statuses[3] } },
            //{ $set: { review: body} }
        );

        //send email to user
        //we need a link where users can post reviews
        await reviewEmail(body.email, "Job review", `How did you find the service? Please leave a rating by click on this link: https://junglandscape.com/review/${body._id}`)

        return NextResponse.json({ status: 200 });
    } catch(error) {
        return NextResponse.json({ status: 500 })
    }
}