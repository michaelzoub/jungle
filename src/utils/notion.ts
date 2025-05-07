import { Client } from "@notionhq/client";
import { infoToString } from "./infoToString";
import { Job } from "@/types/Job";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const db_id = process.env.NOTION_DB_ID || "";

export async function createPage(object: Job) {
    // Create blocks for images
    const imageBlocks = object.details.images.map((image: string) => ({
        object: "block" as const,
        type: "image" as const,
        image: {
            type: "external" as const,
            external: {
                url: image
            }
        }
    }));

    const response = await notion.pages.create({
        cover: {
            type: "external",
            external: {
                url: "https://yourdomain.com/images/services/flowerservice.jpg"
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
                            content: `Job for ${object.customer.first} at ${object.customer.address}`
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
                                content: `Client Information:\nName: ${object.customer.first} ${object.customer.last}\nAddress: ${object.customer.address}\nEmail: ${object.customer.email}\nPhone: ${object.customer.phone}`
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
                                content: `Job Description:\n${object.details.description}`
                            }
                        }
                    ],
                    color: "default"
                }
            },
            {
                object: "block",
                heading_2: {
                    rich_text: [
                        {
                            text: {
                                content: "Project Images"
                            }
                        }
                    ]
                }
            },
        ]
    });

    console.log(response);
}
  