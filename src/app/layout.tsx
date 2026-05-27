import type { Metadata } from "next";
import { Aref_Ruqaa, Montserrat } from "next/font/google";
import "./globals.css";

const arefRuqaa = Aref_Ruqaa({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-ruqaa" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "MUHI - Premium Eid Mubarak Generator",
  description: "Generate beautiful, elegant Eid-ul-Adha Mubarak cards with MUHI.",
  icons: { icon: "/logo.png", apple: "/logo.png" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${arefRuqaa.variable} ${montserrat.variable} scroll-smooth font-sans`}>
      <body className={`min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-muhi-blue/20`}>
        <main className="flex min-h-screen flex-col items-center w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
