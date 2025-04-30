import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import { nodeMailer } from "@/utils/sendToEmail";

export async function POST(req: NextRequest) {
    try {
        //connect to db once, then store client data (form)
        const body = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        //inserts new object 
        await collection.insertOne(body);

        //insert into marker collection

        //send email: (nodemailer)

        return NextResponse.json({ status: 200, message: "Success" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 400 })
    }
}