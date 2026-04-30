import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  Calendar, 
  Shield, 
  BarChart3, 
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  BookOpen,
  MessageSquare,
  Bot
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Badge } from "./components/ui/badge";

import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { UserManagement } from "./components/dashboard/UserManagement";
import { ReportManagement } from "./components/dashboard/ReportManagement";
import { TeamManagement } from "./components/dashboard/TeamManagement";
import { Analytics } from "./components/dashboard/Analytics";
import { Settings } from "./components/dashboard/Settings";
import { HelpGuide } from "./components/dashboard/HelpGuide";
import { FeedbackManagement } from "./components/dashboard/FeedbackManagement";
import { AIVerification } from "./components/dashboard/AIVerification";
import { Toaster } from "./components/ui/sonner";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "reports", label: "Reports", icon: Flag, badge: 48 },
  { id: "teams", label: "Teams", icon: Shield },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "ai-verification", label: "AI Verification", icon: Bot },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "help", label: "Help & Guide", icon: BookOpen },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActivePage} />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <ReportManagement />;
      case "teams":
        return <TeamManagement />;
      case "feedback":
        return <FeedbackManagement />;
      case "ai-verification":
        return <AIVerification />;
      case "analytics":
        return <Analytics />;
      case "help":
        return <HelpGuide />;
      case "settings":
        return <Settings darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
      default:
        return <DashboardOverview onNavigate={setActivePage} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            {/* Logo */}
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sidebar-foreground">Sports+</h3>
                  <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActivePage(item.id)}
                        isActive={activePage === item.id}
                        className="gap-3"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Logout */}
            <div className="mt-auto p-4 border-t border-sidebar-border">
              <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="lg:hidden" />

              {/* Search */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-full"
                />
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Dark Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="h-9 w-9 p-0"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 gap-2 pl-2 pr-3">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          AU
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">Admin User</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setActivePage("settings")}>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivePage("help")}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Help & Guide
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
