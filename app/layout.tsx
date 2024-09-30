import type { Metadata } from "next";
import Providers from "./store/providers";
import AuthRedirect from "./components/AuthRedirect";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutWithSidebar from "./components/LayoutWithSidebar";
import { ReactNode } from "react";

export const gmapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const metadata: Metadata = {
  title: "Grillhub",
  description: "Generated by Next JS",
};

interface RootLayoutProps {
  children: ReactNode; // Specify the type of children here
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <html lang="en">
        <head>
          {/* Google Analytics Tag */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            `,
            }}
          />
        </head>
        <body>
          <AuthRedirect />
          <Header />
          <LayoutWithSidebar>{children}</LayoutWithSidebar>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
