import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test stock app",
  description: "Stock app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <div className="container mx-auto">
          <AuthProvider>
            <main>
              <Navbar></Navbar>
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
