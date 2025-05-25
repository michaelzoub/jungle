"use client";
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { markers } from '@/types/markers';
import MapLegend from './maplegend';

export default function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState<{ jobType: string, status?: string, review: string } | null>(null);

  const LONGITUDE_CORRECTION = -0.045;
  let LATITUDE_CORRECTION = 0.053;

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbHpvdWJrb2ZmIiwiYSI6ImNtMnBobzl6NjBzbnYybXByb2xuM2kzMTQifQ.RSHQO2_-m5bd15lQNxvvBA";

    let zoomAmount = 13;
    if (window.innerWidth < 700) {
      LATITUDE_CORRECTION = 0.023;
      zoomAmount = 12;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-73.62, 45.473],
      zoom: zoomAmount,
      pitch: 25,
      bearing: -32,
    });

    mapRef.current.scrollZoom.disable();
    mapRef.current.boxZoom.disable();
    mapRef.current.doubleClickZoom.disable();
    mapRef.current.touchZoomRotate.disable();
    mapRef.current.dragPan.disable();
    mapRef.current.dragRotate.disable();
    mapRef.current.keyboard.disable();

    async function effectUse() {
      const mapCurrent = mapRef.current;
      if (!mapCurrent) {
        return;
      }
      const bounds = new mapboxgl.LngLatBounds();
          //if no localStorage, get from DB
          const response = await fetch("/api/getJobs", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          const body = await response.json();
          console.log(body);
          body.body.forEach((e: markers) => {
            if (!e.status.toLowerCase().includes("completed")) {
              return;
            }
            console.log(e.location);

            const markerElement = document.createElement('div');
            markerElement.className = "custom-marker";
            markerElement.style.backgroundColor = '#ffffff';
            markerElement.style.width = '20px';
            markerElement.style.height = '20px';
            markerElement.style.borderRadius = '50%';
            markerElement.style.border = '2px solid lime';
            markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

            markerElement.addEventListener('click', () => {
              setSelectedMarkerInfo({
                jobType: e.jobType,
                status: e.status,
                review: e.review
              });
              console.log("clicked")
            });

            const lngLat = new mapboxgl.LngLat(e.location[0] + LONGITUDE_CORRECTION, e.location[1] + LATITUDE_CORRECTION);

            const marker = new mapboxgl.Marker({
              element: markerElement,
              anchor: 'bottom'
            })
            .setLngLat(lngLat)
            .addTo(mapRef.current!)
            .togglePopup();

            markersRef.current.push(marker)

            bounds.extend(e.location)
          })
    }

    effectUse();

  }, []);

  return (
    <main className="max-w-6xl relative mx-auto mt-10 h-[450px]">
      <div
        ref={mapContainerRef!}
        className="rounded-lg overflow-hidden w-full h-full shadow-md relative"
        style={{height: '100%', backgroundSize: "100%" }}
      />
      {selectedMarkerInfo && (
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-64 gap-1 z-[0]">
          <h3 className="font-semibold text-lg mb-2">{selectedMarkerInfo.jobType}</h3>
          {selectedMarkerInfo.status && (
            <p className="text-sm text-gray-600">Status: {selectedMarkerInfo.status}</p>
          )}
          {selectedMarkerInfo.review && (
            <div className='flex flex-col mt-4'>
              <p className="text-sm text-gray-600">{selectedMarkerInfo.review}</p>
              <p className='text-yellow-500'>★★★★★</p>
            </div>
          )}
          <button
            className="mt-2 text-xs text-blue-500 hover:cursor-pointer transition ease-in-out delay-150 hover:text-blue-400"
            onClick={() => setSelectedMarkerInfo(null)}
          >
            Close
          </button>
        </div>
      )}
      <MapLegend></MapLegend>
    </main>
  );
}