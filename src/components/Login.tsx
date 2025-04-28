"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login, associationLogin, logout } from "@/api/auth"; // You'll need to add associationLogin to your auth service
import LoginPageUI from "@/components/layout/Login/LoginPage";

// Form schema remains the same
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setFormStatus({ type: null, message: "" });

    try {
      let response;
      let redirectPath = "/dashboard";

      if (userType === "donor") {
        // First try regular user login
        try {
          response = await login({
            email: values.email,
            password: values.password,
          });

          // Verify the user is actually a donor
          if (response.user?.user_type !== "donor") {
            await logout(); // Clear any partial auth
            throw new Error(
              "Please use recipient login for recipient accounts"
            );
          }

          redirectPath = "/donor-dashboard";
        } catch (userError) {
          // If user login fails, try association login
          try {
            await associationLogin({
              email: values.email,
              password: values.password,
            });
            redirectPath = "/association-dashboard";
          } catch {
            throw userError; // Throw original user error
          }
        }
      } else {
        // Recipient login
        response = await login({
          email: values.email,
          password: values.password,
        });

        // Verify the user is actually a recipient
        if (response.user?.user_type !== "recipient") {
          await logout();
          throw new Error("Please use donor login for donor accounts");
        }

        redirectPath = "/recipient-dashboard";
      }

      setFormStatus({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof error.response === "object" &&
            error.response !== null &&
            "data" in error.response &&
            typeof error.response.data === "object" &&
            error.response.data !== null &&
            "message" in error.response.data &&
            typeof error.response.data.message === "string"
          ? error.response.data.message
          : "Login failed. Please check your credentials.";

      setFormStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginPageUI
      form={form}
      userType={userType}
      setUserType={setUserType}
      loading={loading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formStatus={formStatus}
      onSubmit={onSubmit}
    />
  );
}
