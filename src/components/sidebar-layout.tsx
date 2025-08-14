import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col">
                <nav className="p-2 max-h-fit flex items-center gap-4">
                    <SidebarTrigger />
                </nav>
                {children}
            </main>
        </SidebarProvider>
    );
}
