import type { Metadata } from "next";
import "@/index.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Dronacharya Consultancy | MBBS Admission",
  description: "Since 2003, your trusted admission consultancy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
