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
  HandHeart,
  Heart,
  MessageSquare,
  Moon,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";
import AssociationsList from "./AssociationList";
import DonationHistory from "./DonationHistory";
import ChatSection from "./ChatSection";
import NotificationsPanel from "./NotificationsPanel";
import { useMobile } from "@/hooks/use-mobile";

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("discover");
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useMobile();
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");

    // If there's a saved theme, use it
    // Otherwise, check system preference
    const prefersDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Set the theme state
    setTheme(prefersDark ? "dark" : "light");

    // Apply theme to document
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Apply to document
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-slate-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      {/* Background pattern for light mode */}
      {theme !== "dark" && (
        <div className="absolute inset-0 bg-grid-blue-200/60 bg-grid pointer-events-none" />
      )}

      {/* Header/Navbar with solid background */}
      <div
        className={`sticky top-0 z-20 ${
          theme === "dark"
            ? "bg-slate-900 border-b border-slate-800"
            : "bg-white border-b border-slate-200"
        } px-4 py-3`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-8 w-8 flex items-center justify-center">
              <HandHeart className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">HeartShare</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
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
              className="relative rounded-full"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                3
              </Badge>
            </Button>
            <Avatar className="border-2 border-primary">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-6">
        {/* Welcome Banner */}
        <div
          className={`mb-8 rounded-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-600 to-slate-800"
              : "bg-gradient-to-r from-indigo-600 to-purple-600"
          } p-6 text-white relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-pattern-grid transform rotate-45"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, Jane!
            </h1>
            <p className="opacity-90 max-w-xl z-10">
              Your generosity has helped 5 associations so far. Discover new
              causes that need your support today.
            </p>
          </div>
        </div>

        {showNotifications && (
          <Card className="mb-6 border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsPanel />
            </CardContent>
          </Card>
        )}

        {/* Tab Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList
            className={`inline-flex p-1 ${
              theme === "dark" ? "bg-slate-800" : "bg-slate-100"
            } rounded-full mx-auto`}
          >
            <TabsTrigger value="discover" className="rounded-full px-6">
              Discover
            </TabsTrigger>
            <TabsTrigger value="donations" className="rounded-full px-6">
              My Donations
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full px-6">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card
                className={`${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}
              >
                <div
                  className={`h-2 w-full ${
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
                    className={`rounded-full p-2 ${
                      theme === "dark"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-500">+2 from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}
              >
                <div
                  className={`h-2 w-full ${
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
                    className={`rounded-full p-2 ${
                      theme === "dark"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across 3 categories
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white"
                } rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}
              >
                <div
                  className={`h-2 w-full ${
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
                    className={`rounded-full p-2 ${
                      theme === "dark"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 new conversations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Discover Associations */}
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl shadow-lg`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Discover Associations</CardTitle>
                    <CardDescription>
                      Find causes that align with your values
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className={`rounded-full ${
                      theme === "dark" ? "border-slate-600" : ""
                    }`}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AssociationsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl shadow-lg`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Donation History</CardTitle>
                    <CardDescription>Track your contributions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DonationHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl shadow-lg`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Chat with associations</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className={`rounded-full ${
                      theme === "dark" ? "border-slate-600" : ""
                    }`}
                  >
                    Mark All Read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChatSection theme={theme} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
