/*import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function queryNotionDB() {
  const databaseId = 'd9824bdc-8445-4327-be8b-5b47500af6ce';

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Status',
          select: {
            equals: 'Done',
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'In progress',
          },
        },
      ],
    },
  });

  console.log(response);
}

export function checkIfStatusChanged(jobs, notionJobs) {
    jobs.forEach((job) => {
        notionJobs.forEach((notionJob) => {
            if (job.status.includes(notionJob)) {
                
            }
        })
    })
}*/