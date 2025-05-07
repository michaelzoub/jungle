import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { nodeMailer } from "@/utils/sendToEmail";
import { addressToLongLat } from "@/utils/addressToLngLat";
import { infoToString } from "@/utils/infoToString";
import { statuses } from "@/app/data/statuses";
import { createPage } from "@/utils/notion";
import { Job } from "@/types/Job";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");

        const lngLat = await addressToLongLat(body.address);

        const jobData: Job = {
            location: [lngLat?.longitude || 0, lngLat?.latitude || 0],
            jobType: body.job || "",
            status: statuses[0],
            review: "",
            customer: {
                first: body.first,
                last: body.last,
                email: body.email,
                phone: body.phone,
                address: body.address
            },
            details: {
                description: body.information,
                images: body.images
            }
        };

        //inserts new object 
        await collection.insertOne(jobData);

        //insert into marker collection
        //await db.collection("markers").insertOne(jobData);

        //send email: (nodemailer)
        const stringText = infoToString(jobData);
        await nodeMailer(body.email, `Quote for ${body.first} at ${body.address}`, stringText, body.images);
        await createPage(jobData);
        return NextResponse.json({ status: 200, message: "Success" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 400 })
    }
}