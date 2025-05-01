import { userJob } from "@/types/userJob";

export function infoToString(object: userJob) {
    return `${object.first} ${object.last} \n \n Phone number: ${object.phone} \n \n Address: ${object.address} \n \n Additional information if any: ${object.information} \n \n Images: ${object.images}`
}