"use server";

import { GPSState } from "./getGps";

export async function updateGps(gps: GPSState) {
    await fetch(`${process.env.GPS_SERVER}/track`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(gps),
    });
}
