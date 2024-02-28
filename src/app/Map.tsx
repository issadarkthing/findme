import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({
    lat,
    lon,
    date,
}: {
    lat?: number;
    lon?: number;
    date?: string;
}) {
    if (!lat || !lon) {
        return (
            <>
                <MapContainer
                    className="h-80 w-80 md:h-96 md:w-96 rounded-t-lg"
                    zoom={35}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                <a
                    href=""
                    className="bg-cyan-700 border-0 rounded-b-lg w-80 md:w-96 flex justify-center py-2"
                >
                    Open Map
                </a>
                <div className="mt-2">
                    <DisplayDate date={date} />
                </div>
            </>
        );
    }

    const coordinate: LatLngExpression = [lat, lon];
    const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

    return (
        <>
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
            <div className="mt-1">
                <DisplayDate date={date} />
            </div>
        </>
    );
}

function DisplayDate({ date }: { date?: string }) {
    if (!date) {
        return null;
    }

    return (
        <div className="text-xs">
            Last Updated: {new Date(date).toLocaleString()}
        </div>
    );
}
