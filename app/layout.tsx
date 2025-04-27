import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "University Management System",
  description: "Comprehensive university management system for courses, students, and grades",
=======
  title: "SaaS Dashboard",
  description: "Designed by BlueSky Labs",
>>>>>>> 34394c622616a42f37289c110713b50935219b9d
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
