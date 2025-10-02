import { SidebarLayout } from "@/components/SidebarLayout";




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
<SidebarLayout></SidebarLayout>
      {children}
    </main>
  );
}