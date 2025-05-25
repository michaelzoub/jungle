"use client"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setLocalStorage } from "@/utils/localStorage";
import { getLocalStorage } from "@/utils/localStorage";
import { markers } from "@/types/markers";

import { MapPin, Briefcase, Info, Clock } from "lucide-react"

export default function AdminPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState(false);
    const [markers, setMarkers] = useState<markers[] | null>(null);
    const [clicked, setClicked] = useState<{ _id: string, email: string } | null>(null);

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

    async function completeJob() {
        if (!clicked) return;
        
        const response = await fetch("/api/completeJob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: clicked._id })
        });

        if (response.ok) {
            setClicked(null);
            if (markers) {
                const filteredMarkers = markers.filter(e => e._id?.toString() !== clicked._id);
                setMarkers(filteredMarkers);
            }
        }
    }

    useEffect(() => {
        //get all jobs
        async function getJobs() {
            const response = await fetch("/api/getJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const body = await response.json();
            setMarkers(body.body);
        }

        if (access) {
            getJobs();
        }
    }, [access])


    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
        case "completed":
            return "bg-green-100 text-green-800 hover:bg-green-100"
        case "in progress":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100"
        case "pending":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        case "cancelled":
            return "bg-red-100 text-red-800 hover:bg-red-100"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
        }
    }


    return (
        <main className="w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <form className={`${access ? "hidden" : "flex flex-col gap-1"}`} onSubmit={getLoginInfo}>
                <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
                <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Input>
                <Button>Login</Button>
            </form>
            <section className={`${access ? "visible flex flex-col items-center h-full w-full" : "hidden"}`}>
                {
                    markers && 
                    <div className="flex-1 w-full max-w-2xl overflow-y-auto px-4 py-6">
                        <div className="space-y-4">
                            {markers.map((marker, index) => (
                                <div
                                className={`w-full rounded-lg border border-zinc-200 shadow-sm transition-all duration-200 hover:shadow-md ${(clicked?._id === marker._id?.toString()) ? "bg-green-50" : "bg-white"}`}
                                key={index}
                                onClick={() => setClicked({ _id: marker._id?.toString() || '', email: marker.customer?.email || '' })}
                              >
                                {/* Card Header */}
                                <div className="p-4 pb-2">
                                  <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-medium">
                                      {marker.customer?.first || ''} {marker.customer?.last || ''}
                                    </h3>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium">
                                      <Briefcase className="h-3 w-3" />
                                      {marker.jobType || ''}
                                    </span>
                                  </div>
                                </div>
                          
                                {/* Card Content */}
                                <div className="space-y-3 p-4 pt-0">
                                  <div className="flex items-start gap-2 text-sm text-zinc-600">
                                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                    <span>{marker.customer?.address || ''}</span>
                                  </div>
                          
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-zinc-600" />
                                      <span
                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(marker.status)}`}
                                      >
                                        {marker.status || ''}
                                      </span>
                                    </div>
                                  </div>
                          
                                  <div className="mt-2 border-t pt-3">
                                    <div className="flex gap-2">
                                      <Info className="h-4 w-4 shrink-0 mt-0.5 text-zinc-600" />
                                      <div>
                                        <p className="text-sm font-medium">Description</p>
                                        <p className="text-sm text-zinc-600">{marker.details?.description || ''}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                    </div>
                }
                <Button onClick={completeJob} className="my-6">Complete Job</Button>
            </section>
        </main>
    )
}
