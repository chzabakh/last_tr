import { ReactNode } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
