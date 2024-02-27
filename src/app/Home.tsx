"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { GPSState, getGps } from "@/action/getGps";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Home() {
    const [gps, setGps] = useState<GPSState>({
        errors: 1,
        processed: 1,
        lat: 3.0645408333333335,
        lon: 101.45696583333333,
    });

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
    const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${gps.lat},${gps.lon}`;

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
                className="h-80 w-80 md:h-96 md:w-96 rounded-t-lg"
                center={coordinate}
                zoom={35}
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
            <a
                href={googleMapLink}
                className="bg-cyan-700 border-0 rounded-b-lg w-80 md:w-96 flex justify-center py-2"
            >
                Open Map
            </a>
        </div>
    );
}

function DisplayDate({ date }: { date?: string }) {
    if (!date) {
        return <div>Last Updated: null</div>;
    }

    return <div>Last Updated: {new Date(date).toLocaleString()}</div>;
}
