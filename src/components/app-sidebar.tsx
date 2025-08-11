import { Link, useLocation, useNavigate } from "react-router";
import {
    Home,
    LayoutDashboard,
    Info,
    ChevronsLeftRight,
    LogIn,
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
    SidebarHeader,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import supabase from "@/utils/supabase";
import { useAuth } from "@/context/AuthProvider";

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
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const { user, loading } = useAuth();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        navigate("/");
    };

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
                                            src="/images/user.png"
                                            alt="username"
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        {user ? (
                                            <>
                                                <span className="truncate font-medium">
                                                    {
                                                        user.user_metadata
                                                            .first_name
                                                    }
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user.email}
                                                </span>
                                            </>
                                        ) : loading ? (
                                            <span className="truncate font-medium">
                                                Loading User...
                                            </span>
                                        ) : (
                                            <span className="truncate font-medium">
                                                Guest
                                            </span>
                                        )}
                                    </div>
                                    <ChevronsLeftRight className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right">
                                {user ? (
                                    <DropdownMenuItem
                                        onClick={signOut}
                                        className="cursor-pointer"
                                    >
                                        <LogOut /> Sign Out
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem
                                        onClick={() => navigate("/login")}
                                        className="cursor-pointer"
                                    >
                                        <LogIn /> Login
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
