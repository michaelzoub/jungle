"use client"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState(false);

//get username and pw from mongo, if good then cache for very long time
async function getLoginInfo(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const response = await fetch("/api/loginInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const body = await response.json();
    const sanitizedObj = body.body;

    //compare entered to received
    if ((sanitizedObj.db.username == sanitizedObj.username) && (sanitizedObj.db.password == sanitizedObj.password)) {
        setAccess(true);
    }
}

useEffect(() => {

}, [access])

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
        <form className={`${access ? "hidden" : "flex flex-col gap-1"}`} onSubmit={getLoginInfo}>
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Input>
            <Button>Login</Button>
        </form>
        <section className={`${access ? "visible" : "hidden"}`}>
            <div className="font-semibold">Jobs:</div>
            <div>...</div>
        </section>
    </main>
  )
}
