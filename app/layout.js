import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnagIt",
  description: "Free Youtube video downloader",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-10xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
