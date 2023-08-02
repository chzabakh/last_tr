import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from "./auth_context";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <>
      {/* <AuthProvider> */}
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
      {/* </AuthProvider> */}
    </>
  ) : null;
}
