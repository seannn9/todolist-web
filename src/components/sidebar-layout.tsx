import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col">
                <nav className="p-2 max-h-fit flex items-center gap-4">
                    <SidebarTrigger />
                    <ModeToggle />
                    {!user && (
                        <span className="text-sm ml-auto mr-4 text-muted-foreground italic">
                            You are in Guest Mode,{" "}
                            <Link
                                to="/about"
                                className="text-primary hover:text-destructive transition-all"
                            >
                                Learn More
                            </Link>
                        </span>
                    )}
                </nav>
                {children}
            </main>
        </SidebarProvider>
    );
}
