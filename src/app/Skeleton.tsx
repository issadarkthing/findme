export default function Skeleton() {
    return (
        <div className="animate-pulse">
            <Map />
            <div className="border rounded-xl border-slate-700 mt-4 p-3 space-y-2 w-full h-48" />
        </div>
    );
}

function Map() {
    return (
        <div className="h-80 w-80 md:h-96 md:w-96 rounded-lg border border-slate-700" />
    );
}
