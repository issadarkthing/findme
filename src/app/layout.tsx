import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " min-h-screen"}>
                <header className="py-5">
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-extrabold text-6xl flex justify-center">
                        FindMe
                    </h1>
                </header>
                {children}
                <footer className="font-mono my-2 self-end text-slate-100 text-center">
                    developed by Raziman Mahathir
                </footer>
            </body>
        </html>
    );
}
