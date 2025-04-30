"use client";
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { markers } from '@/types/markers';

type marker = {
    lngLat: [number, number],
    job: string,
    status:string,
    image: string //imageurl
}

export default function MapBox() {

    const [markers, setMarkers] = useState<marker | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbHpvdWJrb2ZmIiwiYSI6ImNtMnBobzl6NjBzbnYybXByb2xuM2kzMTQifQ.RSHQO2_-m5bd15lQNxvvBA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-73.62, 45.47], // Montreal: [lng, lat]
      zoom: 12,
    },);

    mapRef.current = map;

    async function effectUse() {
      const parsedMarkers = getLocalStorage("marker");
      if (parsedMarkers.length == 0) {
          //if no localStorage, get from DB
          const response = await fetch("getMarkers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          const body = await response.json();
          body.body.forEach((e: markers) => {
            new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(map);
          })
      } else {
          parsedMarkers.forEach((e: marker) => {
              new mapboxgl.Marker()
              .setLngLat(e.lngLat)
              .addTo(map);
          })
      }
    }

    effectUse

    return () => map.remove(); // cleanup on unmount
  }, []);

  return (
    <main className="w-[80%] mx-auto mt-10 h-[400px]">
      <div
        ref={mapContainerRef}
        className="rounded-lg overflow-hidden w-full h-full shadow-md"
      />
    </main>
  );
}