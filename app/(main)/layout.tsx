import "../globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`antialiased bg-[#f4efe6] text-[#4b3e2a] flex flex-col min-h-screen`}
          style={{
            fontFamily: `'Georgia', serif`,
          }}
        >
          <Header />          
          {children}
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}