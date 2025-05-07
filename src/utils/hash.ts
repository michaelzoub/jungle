import crypto from "crypto"

export function hash(username: string, password: string) {
    const hashString = (input: string) =>
        crypto.createHash("sha256").update(input).digest("hex");

    return {
        username: hashString(username),
        password: hashString(password)
    };
}