import type { Metadata } from "next";
import "@/index.css";
import ClientLayout from "./ClientLayout";
import { getContactDetails } from "./admin/dashboard/actions";
import { BUSINESS } from "@/data/content";

export const metadata: Metadata = {
  title: "Dronacharya Consultancy | MBBS Admission",
  description: "Since 2003, your trusted admission consultancy.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getContactDetails();
  let businessData: any = { ...BUSINESS };
  if (res.success && res.data) {
    res.data.forEach((item: any) => {
       try {
         businessData[item.key] = JSON.parse(item.value);
       } catch (e) {
         businessData[item.key] = item.value;
       }
    });
  }

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLayout businessData={businessData}>{children}</ClientLayout>
      </body>
    </html>
  );
}
