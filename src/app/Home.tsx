"use client";
import { GPSState, getGps } from "@/action/getGps";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Skeleton from "./Skeleton";
import Field from "./Field";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
    const [gps, setGps] = useState<GPSState>();
    const [deviceStatus, setDeviceStatus] = useState("offline");

    useEffect(() => {
        const id = setInterval(async () => {
            const data = await getGps();

            if (data) {
                const { gps, lastUpdate } = data;

                setGps(gps);

                if (lastUpdate) {
                    const timeDiffInMs = Date.now() - lastUpdate;
                    const timeDiffInSec = timeDiffInMs / 1000;

                    if (timeDiffInSec < 10) {
                        setDeviceStatus("online");
                    } else {
                        setDeviceStatus("offline");
                    }
                }
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
                <Field label="Status" value={deviceStatus} />
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
