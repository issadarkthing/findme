import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FindMe",
    appleWebApp: {
        statusBarStyle: "black-translucent",
    },
    description: "Smart tracking system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " min-h-screen"}>
                <header className="py-5 flex justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-500 font-extrabold text-6xl">
                        FindMe
                    </span>
                </header>
                {children}
                <footer className="font-mono my-2 self-end text-slate-100 text-center">
                    developed by Raziman Mahathir
                </footer>
            </body>
        </html>
    );
}
