"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { GPSState, getGps } from "@/action/getGps";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Home() {
    const [gps, setGps] = useState<GPSState>();

    useEffect(() => {
        const id = setInterval(async () => {
            const data = await getGps();
            setGps(data);
        }, 5 * 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    if (!gps) {
        return "Loading...";
    }

    const coordinate: LatLngExpression = [gps.lat!, gps.lon!];

    return (
        <div>
            <div className="mb-2">
                <div>Latitude: {gps.lat}</div>
                <div>Longitude: {gps.lon}</div>
                <div>Altitude: {gps.alt}</div>
                <div>Satellites Active: {gps.satsActive?.length || 0}</div>
                <DisplayDate date={gps.time} />
            </div>
            <MapContainer
                className="h-80 w-80 md:h-96 md:w-96"
                center={coordinate}
                zoom={40}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinate}>
                    <Popup>Find Me</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

function DisplayDate({ date }: { date?: string }) {
    if (!date) {
        return <div>Last Updated: null</div>;
    }

    return <div>Last Updated: {new Date(date).toLocaleString()}</div>;
}
