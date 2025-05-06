import { MapPin, Info } from "lucide-react"

export default function MapLegend() {
  return (
    <main className="flex justify-end absolute bottom-4 right-4">
        <main className="max-w-6xl">
        <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
        <h3 className="font-medium text-lg mb-3">Map Legend</h3>
        <div className="space-y-3">
            <div className="flex items-center gap-2">
            <div className="bg-green-200 p-1 rounded-full">
                <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm">Completed Jobs</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Click on any marker to view job details</span>
            </div>
        </div>
        </div>
        </main>
    </main>
  )
}
