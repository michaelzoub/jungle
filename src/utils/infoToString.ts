import { Job } from "@/types/Job";

export function infoToString(object: Job) {
    return `${object.customer.first} ${object.customer.last} \n \n Phone number: ${object.customer.phone} \n \n Address: ${object.customer.address} \n \n Additional information if any: ${object.details.description} \n \n Images: ${object.details.images}`
}