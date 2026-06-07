import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="premium-shell relative flex min-h-[100dvh] flex-col bg-background text-foreground">
      <Navbar />
      <main className="relative z-0 flex-grow">{children}</main>
    </div>
  );
}
