import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";

const comforta = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify available weights here
  display: "swap", // Optional: improves font loading
}); 

export const metadata = {
  title: "Climate app",
  description: "We build to take care of our climate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comforta.variable} antialiased bg-gray-100`}>{children}</body>
    </html>
  );
}
