import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "THE HERD",
    description: "Party that never ends",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>THE HERD</title>
            <link rel="icon" href="/assets/img/favicon.ico" sizes="any"/>
        </head>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
