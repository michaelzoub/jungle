import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { nodeMailer } from "@/utils/sendToEmail";
import { addressToLongLat } from "@/utils/addressToLngLat";
import { infoToString } from "@/utils/infoToString";
import { statuses } from "@/app/data/statuses";
import { createPage } from "@/utils/notion";

export async function POST(req: NextRequest) {
    try {
        //connect to db once, then store client data (form)
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        //inserts new object 
        await collection.insertOne(body);

        //insert into marker collection
        console.log(body);
        const lngLat = await addressToLongLat(body.address);
        console.log(lngLat);
        await db.collection("markers").insertOne({
            lngLat: [lngLat?.longitude, lngLat?.latitude],
            jobType: body.job == "" ? "" : body.job,
            status: statuses[0],
            image: body.images,
            review: ""
        })
        //send email: (nodemailer)
        const stringText = infoToString(body);
        await nodeMailer(body.email, `Quote for ${body.first} at ${body.address}`, stringText);
        await createPage(body);
        return NextResponse.json({ status: 200, message: "Success" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 400 })
    }
}