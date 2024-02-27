"use server";

export interface Satellite {
    prn: number;
    elevation: number;
    azimuth: number;
    snr: number;
    status: string;
}

export interface GPSState {
    [key: string]: any;
    processed: number;
    errors: number;

    time?: string;
    lat?: number;
    lon?: number;
    alt?: number;
    speed?: number;
    track?: number;
    satsActive?: number[];
    satsVisible?: Satellite[];
}

export async function getGps(): Promise<GPSState> {
    const result = await fetch(process.env.GPS_SERVER!);
    return await result.json();
}
