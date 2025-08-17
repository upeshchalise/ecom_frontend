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
      
          <Header />          
          {children}
          <Footer />
    </ReactQueryClientProvider>
  );
}