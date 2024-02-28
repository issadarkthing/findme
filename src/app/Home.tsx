"use client";
import { GPSState, getGps } from "@/action/getGps";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Skeleton from "./Skeleton";
import Field from "./Field";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
    const [gps, setGps] = useState<GPSState>();

    useEffect(() => {
        const id = setInterval(async () => {
            const data = await getGps();

            if (data) {
                setGps(data);
            }
        }, 5 * 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    if (!gps) {
        return <Skeleton />;
    }

    return (
        <div>
            <Map lat={gps.lat} lon={gps.lon} date={gps.time} />
            <div className="border rounded-xl border-slate-800 mt-2 p-3 space-y-2">
                <Field label="Latitude" value={gps.lat} />
                <Field label="Longitude" value={gps.lon} />
                <Field label="Altitude" value={gps.alt} />
                <Field
                    label="Active Satellites"
                    value={gps.satsActive?.length || 0}
                />
            </div>
        </div>
    );
}
