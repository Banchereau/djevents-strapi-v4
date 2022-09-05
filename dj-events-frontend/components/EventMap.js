import React from "react";
import { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode, { setLanguage } from "react-geocode";
import mapboxgl from "!mapbox-gl";
import styles from "@/styles/EventMap.module.css";

export default function EventMap({ evt }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [viewport, setViewport] = React.useState({
    latitude: 40.712772,
    longitude: -79.935242,
    width: "100%",
    zoom: 12,
  });

  mapboxgl.accessToken =
    "pk.eyJ1IjoianA0OTMwMCIsImEiOiJjbDIwNzMxdzMwdGk4M2Jta3QyZzdrOWdmIn0.fo7sBnpe1EtkaK3zdgowxg";

  useEffect(() => {
    // Get latitude & longitude from address
    Geocode.fromAddress(evt.attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    
  }, [lat, lng]);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  console.log(lat, lng);
  return <div ref={mapContainer} className={styles.mapcontainer} />;
}
