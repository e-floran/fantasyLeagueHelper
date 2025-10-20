import type { Metadata } from "next";
import { DataProvider } from "../src/context/DataContext";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import { Updater } from "../src/components/Updater";
import "../src/index.css";
import "../src/App.css";

export const metadata: Metadata = {
  title: "Fantasy League Helper",
  description: "ESPN NBA fantasy league helper tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <Header />
          {children}
          <Footer />
          <Updater />
        </DataProvider>
      </body>
    </html>
  );
}
