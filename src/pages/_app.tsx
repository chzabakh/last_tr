import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SocketProvider } from "./socket_context";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <>
      {/* <SocketProvider> */}
        <Component {...pageProps} />
      {/* </SocketProvider> */}
    </>
  ) : null;
}
