"use client";
import { GPSState, getGps } from "@/action/getGps";
import { useEffect, useState } from "react";
import moment from "moment";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import formatcoords from "formatcoords";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
    const [gps, setGps] = useState<GPSState>();
    const [deviceStatus, setDeviceStatus] = useState<"online" | "offline">(
        "offline"
    );

    useEffect(() => {
        const id = setInterval(async () => {
            const data = await getGps();

            if (data) {
                setGps(data);

                const { lastUpdate } = data;

                if (lastUpdate) {
                    const timeDiffInMs = Date.now() - lastUpdate;
                    const timeDiffInSec = timeDiffInMs / 1000;

                    if (timeDiffInSec < 45) {
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
        return <Loading />;
    }

    let coordinate = "---";

    if (gps.lat && gps.lon) {
        coordinate = formatcoords([gps.lat, gps.lon]).format();
    }

    return (
        <div className="flex flex-col items-center">
            <Map lat={gps.lat} lon={gps.lon} date={gps.lastUpdate} />
            <div className="w-80 md:w-96 border rounded-xl border-slate-800 mt-2 p-3 space-y-2">
                <div>
                    <p className="font-semibold">Device Status</p>
                    <DeviceStatus gps={gps} status={deviceStatus} />
                </div>
                <div>
                    <p className="font-semibold">Coordinate</p>
                    {coordinate}
                </div>
                <div className="flex gap-4">
                    <div>
                        <p className="font-semibold">Altitude</p>{" "}
                        {gps.alt ? `${gps.alt}m` : "---"}
                    </div>
                    <div>
                        <p className="font-semibold">Active Satellites</p>{" "}
                        {gps.satsActive == null ? "---" : gps.satsActive}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DeviceStatus({
    status,
    gps,
}: {
    status: "offline" | "online";
    gps?: GPSState;
}) {
    let lastUpdate = "";

    if (status === "offline" && gps?.lastUpdate) {
        const dt = moment(gps.lastUpdate);
        lastUpdate = `(${dt.fromNow()})`;
    }

    return (
        <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3">
                {status === "online" && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                )}
                <span
                    className={`${
                        status === "online" ? "bg-green-500" : "bg-gray-500"
                    } relative inline-flex rounded-full h-3 w-3`}
                />
            </span>
            {status} {lastUpdate}
        </div>
    );
}
