import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Youtube Downloader",
  description: "Download Youtube videos and also convert to mp3 files",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto h-screen">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
