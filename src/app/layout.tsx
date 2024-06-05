import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// My imports
import { Providers } from "./providers";
import Link from "next/link";
import PrimaryNavbar from "./components/navbar/primaryNavbar/primaryNavbar";
import { GlobalContextProvider } from "./context/store";

const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
});

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGroteskFont.className}`}>
        <GlobalContextProvider>
          <Providers>
            <PrimaryNavbar />
            <div className="flex h-screen items-center justify-center border-2 border-lime-300 bg-white-muted bg-no-repeat dark:bg-main-dark-purple">
              <div className="flex w-11/12 max-w-screen-xl flex-col items-center justify-center border-2 border-white">
                <br />
                <div>
                  <Link href="/home">Home</Link>
                  <br />
                  <Link href="/portfolio">Portfolio</Link>
                  <br />
                  <Link href="/converter">Converter</Link>
                </div>
                <br />
              </div>
            </div>
            {children}
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
