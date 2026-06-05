import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
