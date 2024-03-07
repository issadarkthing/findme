import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function Map({
    lat,
    lon,
    date,
}: {
    lat?: number;
    lon?: number;
    date?: number;
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
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinate}>
                    <Popup>Find Me</Popup>
                </Marker>
                <Control position={coordinate} />
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

// recenter position on location update
function Control({ position }: { position: LatLngExpression }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DisplayDate({ date }: { date?: number }) {
    if (!date) {
        return null;
    }

    const dt = new Date(date);
    const displayDate = `${dt.getDate()}/${
        dt.getMonth() + 1
    }/${dt.getFullYear()}`;
    const time = dt.toLocaleTimeString();

    return (
        <div className="text-xs">Last Updated: {`${displayDate} ${time}`}</div>
    );
}
