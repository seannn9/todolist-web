import { Link } from "react-router";
import { SidebarHeader } from "@/components/ui/sidebar";
import {
    Home,
    LayoutDashboard,
    Info,
    ChevronsLeftRight,
    LogOut,
    ListTodo,
    CalendarClock,
    CalendarDays,
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
import { useLocation } from "react-router";

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

const todoItems = [
    {
        title: "Today",
        url: "/dashboard",
        icon: CalendarClock,
    },
    {
        title: "Upcoming",
        url: "/dashboard",
        icon: CalendarDays,
    },
];

export function AppSidebar() {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            asChild
                        >
                            <Link
                                to="/"
                                className="flex items-center gap-1 font-bold h-8 w-8 rounded-lg"
                            >
                                <ListTodo
                                    className="!size-8"
                                    color="var(--primary)"
                                />
                                <span className="text-2xl">TASK MASTER</span>
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
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        asChild
                                    >
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
                <SidebarGroup>
                    <SidebarGroupLabel>Tasks</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {todoItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        asChild
                                    >
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
                                className="cursor-pointer"
                            >
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="username"
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            Username
                                        </span>
                                        <span className="truncate text-xs">
                                            user@email.com
                                        </span>
                                    </div>
                                    <ChevronsLeftRight className="ml-auto size-4" />
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
