export default function Skeleton() {
    return (
        <div className="animate-pulse">
            <Map />
            <div className="mt-2 space-y-2">
                <Field />
                <Field />
                <Field />
                <Field />
            </div>
        </div>
    );
}

function Field() {
    return (
        <div className="h-20 border border-slate-700 rounded-xl flex-col px-4 py-1"></div>
    );
}

function Map() {
    return (
        <div className="h-80 w-80 md:h-96 md:w-96 rounded-lg border border-slate-700" />
    );
}
