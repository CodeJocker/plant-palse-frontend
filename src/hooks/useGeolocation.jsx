"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
    placeName: "",
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        loaded: true,
        coordinates: { lat: null, lng: null },
        placeName: "",
        error: "Geolocation not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Call your Next.js API route (proxy to Nominatim)
          const res = await axios.get(
            `/api/reverse-geocode?lat=${lat}&lon=${lng}`
          );
          const placeName = res.data?.display_name || "Unknown location";

          setLocation({
            loaded: true,
            coordinates: { lat, lng },
            placeName,
            error: null,
          });
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          setLocation({
            loaded: true,
            coordinates: { lat, lng },
            placeName: "Unknown location",
            error: "Failed to get place name",
          });
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocation({
          loaded: true,
          coordinates: { lat: null, lng: null },
          placeName: "",
          error: err.message || "Could not fetch location",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return location;
}
