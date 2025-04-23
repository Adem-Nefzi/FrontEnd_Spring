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
import { Bell, MessageSquare, Moon, Package, Sun, Users } from "lucide-react";
import DonationsList from "./DonationsList";
import ApplicantsList from "./ApplicantsList";
import ChatSection from "./ChatSection";
import NotificationsPanel from "../Donor Dashboard/NotificationsPanel";
import { useMobile } from "@/hooks/use-mobile";
import NeedsList from "./NeedsList";
import AssociationProfile from "./AssociationProfile";

export default function AssociationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
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
      className={`p-4 md:p-6 ${
        theme === "dark"
          ? "bg-slate-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Association Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage donations and help those in need
          </p>
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
              5
            </Badge>
          </Button>
          <div className="hidden sm:flex items-center gap-3">
            <Avatar className="border-2 border-primary">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Association"
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                HH
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {showNotifications && (
        <Card
          className={`mb-6 border shadow-lg ${
            theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationsPanel />
          </CardContent>
        </Card>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList
          className={`grid grid-cols-4 w-full max-w-md ${
            theme === "dark" ? "bg-slate-800" : "bg-slate-100"
          }`}
        >
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
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
                  <Package className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +8 from last month
                </p>
              </CardContent>
            </Card>
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
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
                  Active Applicants
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
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  +5 new this week
                </p>
              </CardContent>
            </Card>
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
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
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  3 new conversations
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl shadow-lg`}
            >
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest donations received</CardDescription>
              </CardHeader>
              <CardContent>
                <DonationsList limit={3} />
              </CardContent>
            </Card>
            <Card
              className={`${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
              } rounded-xl shadow-lg`}
            >
              <CardHeader>
                <CardTitle>Recent Applicants</CardTitle>
                <CardDescription>People who need your help</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicantsList limit={3} />
              </CardContent>
            </Card>
          </div>

          <Card
            className={`${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            } rounded-xl shadow-lg`}
          >
            <CardHeader>
              <CardTitle>Current Needs</CardTitle>
              <CardDescription>
                Items your association currently needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NeedsList />
            </CardContent>
          </Card>

          <Card
            className={`${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            } rounded-xl shadow-lg`}
          >
            <CardHeader>
              <CardTitle>Association Profile</CardTitle>
              <CardDescription>
                Manage your association information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssociationProfile />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card
            className={`${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            } rounded-xl shadow-lg`}
          >
            <CardHeader>
              <CardTitle>Donations</CardTitle>
              <CardDescription>
                All donations received by your association
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonationsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <Card
            className={`${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            } rounded-xl shadow-lg`}
          >
            <CardHeader>
              <CardTitle>Applicants</CardTitle>
              <CardDescription>People who need your help</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicantsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card
            className={`${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"
            } rounded-xl shadow-lg`}
          >
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Chat with applicants and donors</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatSection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
