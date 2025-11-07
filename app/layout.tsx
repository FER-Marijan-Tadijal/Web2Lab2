import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web2 Lab",
  description: "Please give all points thx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
