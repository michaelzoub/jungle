import { NextResponse } from 'next/server';
import { queryNotionDB } from '@/utils/queryNotionDB';
import { checkIfStatusChanged } from '@/utils/queryNotionDB';
import { connectToDatabase } from '@/utils/mongo';

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("userJob");
        const jobs = collection.find().toArray(); //used to be await collection.find({ status: { $ne: "Completed 🎉" } }).toArray();
        const notionJobs = queryNotionDB();
        jobs.then((job) => {
            notionJobs.then((notionJob) => {
                checkIfStatusChanged(job, notionJob)
            })
        })
    } catch(error) {
        console.error(error);
    }
    return NextResponse.json({ ok: true });
}