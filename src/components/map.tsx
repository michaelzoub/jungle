"use client";
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

type marker = {
    lngLat: [number, number],
    job: string,
    status:string
}

export default function MapBox() {

    const [markers, setMarkers] = useState<marker | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbHpvdWJrb2ZmIiwiYSI6ImNtMnBobzl6NjBzbnYybXByb2xuM2kzMTQifQ.RSHQO2_-m5bd15lQNxvvBA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-73.58781, 45.50884], // Montreal: [lng, lat]
      zoom: 11,
    },);

    mapRef.current = map;

    const parsedMarkers = getLocalStorage("marker");
    if (parsedMarkers.length == 0) {
        //get from db
    } else {
        parsedMarkers.forEach((e: marker) => {
            new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(map);
        })
    }

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