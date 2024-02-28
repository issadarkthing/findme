"use client";
import { GPSState, getGps } from "@/action/getGps";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Skeleton from "./Skeleton";
const Map = dynamic(() => import("./Map"), { ssr: false });

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
        return <Skeleton />;
    }

    return (
        <div>
            <Map lat={gps.lat} lon={gps.lon} date={gps.time} />
            <div className="mt-2 space-y-2">
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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="border border-slate-500 rounded-xl flex-col px-4 py-1">
            <div className="font-semibold">{label}</div>
            <div className="text-xl">{value || "--"}</div>
        </div>
    );
}
