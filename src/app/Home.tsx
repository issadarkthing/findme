"use client";
import { GPSState, getGps } from "@/action/getGps";
import { useEffect, useState } from "react";

export default function Home() {
    const [gps, setGps] = useState<GPSState>();

    useEffect(() => {
        const id = setInterval(async () => {
            const data = await getGps();
            setGps(data);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    if (!gps) {
        return "Loading...";
    }

    return (
        <div>
            <div>Latitude: {gps.lat}</div>
            <div>Longitude: {gps.lon}</div>
            <div>Altitude: {gps.alt}</div>
            <div>Satellites Active: {gps.satsActive?.length || 0}</div>
            <DisplayDate date={gps.time} />
        </div>
    );
}

function DisplayDate({ date }: { date?: string }) {
    if (!date) {
        return <div>Last Updated: null</div>;
    }

    return <div>Last Updated: {new Date(date).toLocaleString()}</div>;
}
