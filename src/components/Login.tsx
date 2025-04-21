"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  LogIn,
  Heart,
  Users,
  ArrowRight,
  Moon,
  Sun,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

// Import Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  AuthProvider,
} from "firebase/auth";

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: "AIzaSyDwl-2rtpXqnlx3l3EUyDKUOq0B4B2RNR4",
  authDomain: "donationsmanagement-b9635.firebaseapp.com",
  projectId: "donationsmanagement-b9635",
  storageBucket: "donationsmanagement-b9635.firebasestorage.app",
  messagingSenderId: "227679669926",
  appId: "1:227679669926:web:133ec200348aca70072e67",
  measurementId: "G-FZZX6PY88J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
// Form schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Handle regular form submission
  async function onSubmit(values: FormValues) {
    setLoading(true);
    setFormStatus({ type: null, message: "" });

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setFormStatus({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      // You can redirect here or handle successful login
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
        // window.location.href = '/dashboard'; // Redirect if needed
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormStatus({
          type: "error",
          message: error.message || "Failed to sign in. Please try again.",
        });
      } else {
        setFormStatus({
          type: "error",
          message: "An unknown error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle social sign in
  const handleSocialSignIn = async (
    provider: AuthProvider,
    providerName: string
  ) => {
    setSocialLoading(providerName);
    setFormStatus({ type: null, message: "" });

    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;

      setFormStatus({
        type: "success",
        message: `Successfully signed in with ${providerName}! Redirecting...`,
      });

      // You can redirect here or handle successful login
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
        // window.location.href = '/dashboard'; // Redirect if needed
      }, 2000);
    } catch (error: unknown) {
      console.error(error);
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : `Failed to sign in with ${providerName}. Please try again.`,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  // Apply theme on initial load
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen auth-background floating-shapes flex items-center justify-center p-4 md:p-8">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Main content */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-70 animate-pulse-slow delay-700"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/10 rounded-full blur-xl opacity-50 animate-float-slow"></div>

        {/* Left side - Info */}
        <div className="relative z-10 text-center md:text-left space-y-6 order-2 md:order-1">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">
            {userType === "donor" ? <Heart size={24} /> : <Users size={24} />}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground max-w-md">
              {userType === "donor"
                ? "Sign in to continue your journey of making a difference through your generous donations."
                : "Sign in to manage your campaigns and connect with donors who believe in your mission."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span className="text-sm">
                  {userType === "donor"
                    ? "Support causes you care about"
                    : "Receive support for your mission"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span className="text-sm">
                  {userType === "donor"
                    ? "Track your donation impact"
                    : "Connect with generous donors"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span className="text-sm">
                  {userType === "donor"
                    ? "Get tax-deductible receipts"
                    : "Manage and report on donations"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 hidden md:block">
            <div className="relative w-full h-64 bg-dot-pattern rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 p-6 glass-card rounded-lg max-w-xs mx-auto transform hover:scale-105 transition-all duration-300">
                  <LogIn size={48} className="mx-auto text-primary" />
                  <p className="text-lg font-medium text-foreground">
                    Secure Authentication
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with industry-standard encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="relative z-10 order-1 md:order-2">
          <div className="glass-card w-full shadow-lg rounded-lg overflow-hidden">
            {/* Card header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-2 justify-center mb-2">
                <LogIn className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
              </div>
              <p className="text-center text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            {/* User type selector */}
            <div className="p-6 pb-0">
              <div className="flex rounded-md overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={() => setUserType("donor")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    userType === "donor"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  Donor
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("recipient")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    userType === "recipient"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  Recipient
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Status message */}
                {formStatus.type && (
                  <div
                    className={`p-3 rounded-md flex items-center gap-2 text-sm ${
                      formStatus.type === "success"
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <Check className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`flex h-10 w-full rounded-md border ${
                      form.formState.errors.email
                        ? "border-destructive"
                        : "border-input"
                    } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`flex h-10 w-full rounded-md border ${
                        form.formState.errors.password
                          ? "border-destructive"
                          : "border-input"
                      } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10`}
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="h-4 w-4 rounded-sm border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring"
                      {...form.register("rememberMe")}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-normal"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full group flex items-center justify-center py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  )}
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => handleSocialSignIn(googleProvider, "Google")}
                    disabled={!!socialLoading}
                    className="flex items-center justify-center w-full py-2 px-4 rounded-md border border-input bg-background hover:bg-accent/50 transition-colors disabled:opacity-50"
                  >
                    {socialLoading === "Google" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          focusable="false"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                            fill="#EA4335"
                          />
                          <path
                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                            fill="#34A853"
                          />
                        </svg>
                        <span>Continue with Google</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Sign up link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    Create account <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/20 animate-float-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-secondary/20 animate-float-slow delay-700"></div>
        </div>
      </div>
    </div>
  );
}
