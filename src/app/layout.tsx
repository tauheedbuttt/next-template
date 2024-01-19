import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/redux/provider";
import Alert from "@/components/alert/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Template",
  description: "Next.js boiler plate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
        <Alert />
      </Providers>
    </html>
  );
}
