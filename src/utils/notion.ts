import { Client } from "@notionhq/client";
import { infoToString } from "./infoToString";
import { userJob } from "@/types/userJob";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const db_id = process.env.NOTION_DB_ID || "";

export async function createPage(object: userJob) {
    const response = await notion.pages.create({
      cover: {
        type: "external",
        external: {
          url: "https://yourdomain.com/images/services/flowerservice.jpg" // ← Must be a full URL
        }
      },
      icon: {
        type: "emoji",
        emoji: "🌿"
      },
      parent: {
        type: "page_id",
        page_id: "1e8e521d9cf98017a5e5d27772d6d20d"
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: `Job for ${object.first} at ${object.address}`
              }
            }
          ]
        }
      },
      children: [
        {
          object: "block",
          heading_2: {
            rich_text: [
              {
                text: {
                  content: "Job Details"
                }
              }
            ]
          }
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `Client Information:\nName: ${object.first} ${object.last}\nAddress: ${object.address}\nEmail: ${object.email}\nPhone: ${object.phone}`
                }
              }
            ],
            color: "default"
          }
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `Job Description:\n${object.information}`
                }
              }
            ],
            color: "default"
          }
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `Images:`
                }
              }
            ],
            color: "default"
          }
        }
      ]
    });
  
    console.log(response);
  }
  