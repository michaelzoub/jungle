import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
    try {
        //connect to db once, then store client data (form)
    } catch (error) {
        console.log(error);
    }
}