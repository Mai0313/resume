import type { ReactNode } from "react";

import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background text-foreground">
      {pathname !== "/" && <div aria-hidden="true" className="ambient-field" />}
      <Navbar />
      <main className="relative z-0 flex-grow">{children}</main>
    </div>
  );
}
