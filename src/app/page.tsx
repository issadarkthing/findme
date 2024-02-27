import dynamic from "next/dynamic";
const Home = dynamic(() => import("./Home"), { ssr: false });

export default function App() {
    return (
        <main className="flex flex-col items-center justify-between">
            <Home />
        </main>
    );
}
