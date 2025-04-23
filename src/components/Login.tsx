"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { AuthProvider } from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import LoginPageUI from "@/components/layout/Login/LoginPage";

// Form schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
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
        window.location.href = "/dashboard"; // Redirect if needed
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
        window.location.href = "/donor-dashboard"; // Redirect if needed
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

  return (
    <LoginPageUI
      form={form}
      userType={userType}
      setUserType={setUserType}
      loading={loading}
      socialLoading={socialLoading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formStatus={formStatus}
      onSubmit={onSubmit}
      handleSocialSignIn={handleSocialSignIn}
      googleProvider={googleProvider}
    />
  );
}
