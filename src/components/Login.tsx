"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Handshake,
  Coins,
  ArrowRight,
  User,
  Lock,
  Eye,
  EyeOff,
  Globe,
  ChevronLeft,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);

  // Simulated login process
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDisplayLoader(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect would happen here in a real app
    }, 2000);
  };

  // If loading state ends, remove loader after animation completes
  useEffect(() => {
    if (!loading && displayLoader) {
      const timer = setTimeout(() => {
        setDisplayLoader(false);
      }, 500); // Match this to your animation duration
      return () => clearTimeout(timer);
    }
  }, [loading, displayLoader]);

  return (
    <div className="min-h-screen w-full auth-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 floating-shapes">
        {/* World map pattern - representing global impact */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M48.8,5.1c-0.3,0.3-0.8,0.6-1,0.8c-0.3,0.2-0.6,0.4-0.7,0.5c-0.1,0.1-0.3,0.3-0.5,0.5c-0.1,0.1-0.4,0.5-0.6,0.9
          c-0.2,0.3-0.4,0.7-0.5,0.7c-0.1,0.1-0.3,0.6-0.6,1.2c-0.3,0.5-0.5,1.1-0.6,1.2c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.4-0.3,0.8-0.4,1
          c-0.1,0.2-0.2,0.6-0.3,0.9c-0.1,0.4-0.2,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.4,0.9c-0.1,0.4-0.3,0.8-0.3,1c-0.1,0.1-0.2,0.5-0.3,0.8
          c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.1,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1
          c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8
          c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7
          c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9
          c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1
          c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8
          c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8
          c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9
          c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1
          c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8
          c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7
          c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9
          c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1
          c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8
          c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8
          c-0.1,0.1-0.2,0.5-0.3,0.9c-0.1,0.4-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.3,0.7c0,0.1-0.2,0.5-0.3,0.9
          c-0.1,0.5-0.3,0.9-0.4,1.1c-0.1,0.1-0.2,0.5-0.3,0.8c-0.1,0.3-0.3,0.7-0.3,0.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
          />
        </svg>

        {/* Animated circles representing global impact */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.5, 1],
              opacity: [0, 0.3, 0.1, 0],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Donation icons floating around */}
        {[Heart, Handshake, Coins, Globe].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20"
            style={{
              left: `${index * 25 + Math.random() * 10}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [-50, -150],
              x: [0, Math.sin(index) * 30],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 2,
            }}
          >
            <Icon size={30 + index * 10} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-xl px-4">
        <a
          href="/"
          className="inline-flex items-center text-sm text-primary hover:underline mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to home
        </a>

        <motion.div
          className="glass-card overflow-hidden backdrop-blur-md rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-20 w-20 flex items-center justify-center rounded-full border-4 border-primary/20 bg-background overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <motion.div
                  className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50 blur-sm"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{ zIndex: -1 }}
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to HeartShare
              </h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your donation management dashboard
              </p>
            </div>

            <Tabs defaultValue="donor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="donor"
                  className="rounded-l-full rounded-r-none"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donor
                </TabsTrigger>
                <TabsTrigger
                  value="organization"
                  className="rounded-r-full rounded-l-none"
                >
                  <Handshake className="mr-2 h-4 w-4" />
                  Organization
                </TabsTrigger>
              </TabsList>

              <TabsContent value="donor">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="donor@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-foreground">
                        Password
                      </Label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group"
                    disabled={loading}
                  >
                    <AnimatePresence mode="wait">
                      {displayLoader ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          <span>Signing in...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="signin"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center"
                        >
                          <span>Sign in</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 -translate-x-full animate-[shimmer_2.5s_infinite]" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="organization">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="org-email"
                        type="email"
                        placeholder="organization@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="org-password" className="text-foreground">
                        Password
                      </Label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="org-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="org-remember" />
                    <Label
                      htmlFor="org-remember"
                      className="text-sm font-normal"
                    >
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group"
                    disabled={loading}
                  >
                    <AnimatePresence mode="wait">
                      {displayLoader ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          <span>Signing in...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="signin"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center"
                        >
                          <span>Sign in</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 -translate-x-full animate-[shimmer_2.5s_infinite]" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>

            {/* Impact counter - a small feature showing donation statistics */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex justify-between text-xs text-muted-foreground">
                <div className="flex flex-col items-center">
                  <Coins className="h-4 w-4 mb-1 text-primary" />
                  <span className="font-medium text-foreground">$2.7M+</span>
                  <span>Donations</span>
                </div>
                <div className="flex flex-col items-center">
                  <Handshake className="h-4 w-4 mb-1 text-primary" />
                  <span className="font-medium text-foreground">140+</span>
                  <span>Organizations</span>
                </div>
                <div className="flex flex-col items-center">
                  <Heart className="h-4 w-4 mb-1 text-primary" />
                  <span className="font-medium text-foreground">28K+</span>
                  <span>Lives Improved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom donation progress bar */}
          <div className="h-1.5 w-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "15%" }}
              animate={{ width: ["15%", "65%", "35%", "80%", "25%"] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>

        {/* Certification badge */}
        <motion.div
          className="absolute -top-4 -right-4 bg-background rounded-full p-2 shadow-lg border border-primary/20"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="bg-primary/10 rounded-full p-1.5">
            <Shield className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
