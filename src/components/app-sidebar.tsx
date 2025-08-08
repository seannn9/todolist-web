import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import {
    Home,
    LayoutDashboard,
    Info,
    ChevronsLeftRight,
    LogOut,
    CircleUser,
    ListTodo,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Info",
        url: "/about",
        icon: Info,
    },
];

export function AppSidebar() {
    const { state } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                to="/"
                                className="flex items-center gap-1 font-bold"
                            >
                                <ListTodo className="!size-6" />
                                <span>TASK MASTER</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="list-none">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className="transition-all data-[state=open]:bg-accent cursor-pointer h-fit"
                            >
                                <SidebarMenuButton
                                    className={cn(
                                        state === "collapsed" &&
                                            "justify-center"
                                    )}
                                >
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>
                                            <CircleUser />
                                        </AvatarFallback>
                                    </Avatar>
                                    {state !== "collapsed" && (
                                        <>
                                            <div className="flex flex-col overflow-hidden">
                                                <span>User</span>
                                                <span className="text-[12px]">
                                                    useremail@gmail.com
                                                </span>
                                            </div>
                                            <ChevronsLeftRight className="ml-auto" />
                                        </>
                                    )}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right">
                                <DropdownMenuItem className="cursor-pointer">
                                    <LogOut /> Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
