"use server";

export type GPSState = {
    lat?: number;
    lon?: number;
    alt?: number;
    satsActive?: number;
    lastUpdate?: number;
};

export async function getGps(): Promise<GPSState | null> {
    const result = await fetch(`${process.env.GPS_SERVER!}/state`);

    if (result.status !== 200) {
        return null;
    }

    return await result.json();
}
