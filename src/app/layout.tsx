import "@/app/globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Online Store",
  description: "Dummy Online Store",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </body>
    </html>
  );
}
