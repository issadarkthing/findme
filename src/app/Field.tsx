export default function Field({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <p className="font-semibold">{label}</p> {value || "---"}
        </div>
    );
}
