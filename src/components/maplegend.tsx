import { MapPin, Info } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function MapLegend() {
  const { t } = useLanguage();

  return (
    <main className="flex justify-end absolute bottom-4 right-4">
      <main className="max-w-6xl">
        <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
          <h3 className="font-medium text-lg mb-3">{t('map.legend.title')}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-200 p-1 rounded-full">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm">{t('map.legend.completedJobs')}</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>{t('map.legend.clickMarker')}</span>
            </div>
          </div>
        </div>
      </main>
    </main>
  )
}
