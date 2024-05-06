"use client";
import { updateGps } from "@/action/updateGps";
import { useEffect, useState } from "react";

export default function Track() {
    const [track, setTrack] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if ("geolocation" in navigator && track) {
            const id = setInterval(() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    const gps = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        alt: position.coords.altitude || undefined,
                        satsActive: Math.ceil(Math.random() * 9) + 1,
                        lastUpdate: position.timestamp,
                    };

                    updateGps(gps);
                });
            }, 5 * 1000);

            setTimerId(id);
        }

        if (!track) {
            clearInterval(timerId);
        }
    }, [track]);

    return (
        <div>
            Track your current location
            <button
                style={{ backgroundColor: track ? "firebrick" : "green" }}
                onClick={() => setTrack(!track)}
                className="bg-cyan-700 border-0 rounded-lg w-80 md:w-96 flex justify-center py-2"
            >
                {track ? "Stop Tracking" : "Start Tracking"}
            </button>
        </div>
    );
}
