import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-fg">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
