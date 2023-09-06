import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SocketProvider } from "../components/socket_context";
import DashboardLayout from "@/components/Layout/dashboardLayout";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  const pathname = usePathname();
  const shouldRenderSidebar = !["/login", "/register", "/"].includes(pathname);
  useEffect(() => setRender(true), []);
  return render ? (
    <>
      {/* <SocketProvider> */}
      {shouldRenderSidebar ? (
        <>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
      {/* </SocketProvider> */}
    </>
  ) : null;
}
