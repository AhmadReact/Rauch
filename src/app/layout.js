import { Inter } from "next/font/google";
import "./globals.css";

import Loading from "./Components/Loading";
import { Suspense } from "react";
import { Providers } from "./Providers";
import { ThemeProviders } from "./ThemeProviders";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>

      <body className={inter.className}>
        <Providers>
          <Loading>
            {" "}
            <ThemeProviders>
              <Suspense
                fallback={
                  <div className="overlay">
                    <div className="loaderImage-container">
                      <span className="loader"></span>
                    </div>
                  </div>
                }
              >
                {children}
              </Suspense>
            </ThemeProviders>
          </Loading>
        </Providers>
      </body>
    </html>
  );
}
