"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Heart,
  MessageSquare,
  Moon,
  Sun,
  TrendingUp,
  Users,
  LogOut,
  User,
  Edit,
  Save,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../../../hooks/use-toast";
import AssociationsList from "./AssociationList";
import DonationHistory from "./DonationHistory";
import ChatSection from "./ChatSection";
import NotificationsPanel from "./NotificationsPanel";

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("discover");
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = () => {
    // Add your logout logic here
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your donor account",
    });
    setShowLogoutDialog(false);
  };

  const handleProfileUpdate = () => {
    if (profileData.password !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Add your profile update logic here
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
    setShowProfileDialog(false);
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 to-slate-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400-600">
              Donor Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Support causes that matter to you
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-opacity-20 hover:bg-indigo-500 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-opacity-20 hover:bg-indigo-500 transition-all"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 animate-pulse">
                3
              </Badge>
            </Button>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="border-2 border-primary hover:scale-105 transition-transform cursor-pointer">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`w-56 mt-2 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                }`}
                align="end"
              >
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-indigo-500/10 focus:text-indigo-500"
                  onClick={() => setShowProfileDialog(true)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-red-500/10 focus:text-red-500"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent
            className={`sm:max-w-[425px] rounded-lg ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            }`}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-red-500" />
                Confirm Logout
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to log out of your donor account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Profile Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent
            className={`sm:max-w-[540px] p-0 rounded-xl overflow-hidden border-0 shadow-2xl transition-all duration-300 ${
              theme === "dark" ? "bg-slate-900" : "bg-white"
            }`}
          >
            {/* Decorative background elements */}
            <div
              className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-2xl opacity-20 ${
                theme === "dark" ? "bg-purple-600" : "bg-indigo-200"
              }`}
            />
            <div
              className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-2xl opacity-20 ${
                theme === "dark" ? "bg-indigo-600" : "bg-purple-200"
              }`}
            />

            {/* Header with gradient */}
            <div
              className={`relative overflow-hidden px-6 py-4 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-slate-800 to-slate-900"
                  : "bg-gradient-to-r from-indigo-50 to-purple-50"
              }`}
            >
              <div className="flex items-center space-x-3 z-10 relative">
                <div
                  className={`p-2.5 rounded-lg shadow-sm ${
                    theme === "dark"
                      ? "bg-indigo-900/50 text-indigo-300 border border-indigo-800/50"
                      : "bg-white text-indigo-600 border border-indigo-100"
                  }`}
                >
                  <Edit className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription
                    className={`text-xs ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Manage your account details and security settings
                  </DialogDescription>
                </div>
              </div>
            </div>

            <div className="relative px-6 py-4 space-y-5">
              {/* Personal Info Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-6 w-1 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-b from-indigo-500 to-purple-500"
                        : "bg-gradient-to-b from-indigo-400 to-purple-400"
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold ${
                      theme === "dark" ? "text-indigo-200" : "text-indigo-600"
                    }`}
                  >
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      className={`h-9 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 hover:border-indigo-500/50"
                          : "bg-white border-slate-200 hover:border-indigo-300"
                      } transition-colors`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      className={`h-9 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 hover:border-indigo-500/50"
                          : "bg-white border-slate-200 hover:border-indigo-300"
                      } transition-colors`}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-6 w-1 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-b from-purple-500 to-pink-500"
                        : "bg-gradient-to-b from-purple-400 to-pink-400"
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold ${
                      theme === "dark" ? "text-purple-200" : "text-purple-600"
                    }`}
                  >
                    Security Settings
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-xs font-medium">
                        New Password
                      </Label>
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={profileData.password}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          password: e.target.value,
                        })
                      }
                      className={`h-9 text-sm focus-visible:ring-2 focus-visible:ring-purple-500/50 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 hover:border-purple-500/50"
                          : "bg-white border-slate-200 hover:border-purple-300"
                      } transition-colors`}
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-xs font-medium"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`h-9 text-sm focus-visible:ring-2 focus-visible:ring-purple-500/50 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 hover:border-purple-500/50"
                          : "bg-white border-slate-200 hover:border-purple-300"
                      } transition-colors`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter
              className={`px-6 py-3 border-t ${
                theme === "dark" ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <Button
                variant="ghost"
                onClick={() => setShowProfileDialog(false)}
                className={`rounded-lg px-4 h-9 text-xs ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-slate-50 text-slate-600"
                } transition-colors`}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProfileUpdate}
                className={`rounded-lg px-4 h-9 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5`}
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rest of your existing dashboard code remains exactly the same */}
        {/* Notifications Panel */}
        {showNotifications && (
          <Card
            className={`mb-8 border shadow-lg animate-fade-in ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Your recent activity</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <NotificationsPanel />
            </CardContent>
          </Card>
        )}

        {/* Welcome Banner */}
        <div
          className={`mb-8 rounded-xl shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-700 to-slate-800"
              : "bg-gradient-to-r from-indigo-600 to-purple-600"
          } p-6 text-white relative overflow-hidden`}
        >
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, Jane!
            </h1>
            <p className="opacity-90 max-w-xl">
              Your generosity has helped 5 associations so far. Discover new
              causes that need your support today.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList
            className={`grid grid-cols-3 w-full max-w-md mx-auto md:mx-0 shadow-sm ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-white border"
            }`}
          >
            <TabsTrigger
              value="discover"
              className="transition-all data-[state=active]:shadow-sm"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="donations"
              className="transition-all data-[state=active]:shadow-sm"
            >
              My Donations
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="transition-all data-[state=active]:shadow-sm"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card
                className={`group hover:-translate-y-1 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-lg`}
              >
                <div
                  className={`h-1 w-full group-hover:h-2 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-indigo-600"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500"
                  }`}
                ></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Donations
                  </CardTitle>
                  <div
                    className={`rounded-full p-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30"
                        : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-500">+2 from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`group hover:-translate-y-1 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-lg`}
              >
                <div
                  className={`h-1 w-full group-hover:h-2 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-purple-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                ></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Associations Helped
                  </CardTitle>
                  <div
                    className={`rounded-full p-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30"
                        : "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Across 3 categories
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`group hover:-translate-y-1 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-lg`}
              >
                <div
                  className={`h-1 w-full group-hover:h-2 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-blue-600"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500"
                  }`}
                ></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unread Messages
                  </CardTitle>
                  <div
                    className={`rounded-full p-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30"
                        : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 new conversations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Discover Associations */}
            <Card
              className={`group hover:shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Discover Associations
                </CardTitle>
                <CardDescription>
                  Find causes that align with your values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssociationsList />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card
              className={`group hover:shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-indigo-500" />
                  Your Donation History
                </CardTitle>
                <CardDescription>Track your contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <DonationHistory />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card
              className={`group hover:shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Messages
                </CardTitle>
                <CardDescription>Chat with associations</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatSection />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
