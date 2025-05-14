"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login, logout } from "@/api/auth";
import LoginPageUI from "@/components/layout/Login/LoginPage";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [userType, setUserType] = useState<"donor" | "recipient" | "admin">(
    "donor"
  );
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
      let redirectPath = "/dashboard";
      let loginUserType: "user" | "association" | undefined;

      // Set the appropriate userType for the API call based on the selected user type
      if (userType === "recipient") {
        loginUserType = "user"; // Recipients are users in the backend
      } else if (userType === "donor") {
        loginUserType = "user"; // Donors are users in the backend
      } else if (userType === "admin") {
        loginUserType = "user"; // Admins are users in the backend
      }

      // Attempt login with the appropriate user type
      const response = await login({
        email: values.email,
        password: values.password,
        userType: loginUserType,
      });

      // Verify user type matches the selected login type
      if (userType === "donor") {
        if (response.user?.userType !== "DONOR") {
          await logout();
          throw new Error("Please use the correct login type for your account");
        }
        redirectPath = "/donor-dashboard";
      } else if (userType === "recipient") {
        if (response.user?.userType !== "RECIPIENT") {
          await logout();
          throw new Error("Please use the correct login type for your account");
        }
        redirectPath = "/recipient-dashboard";
      } else if (userType === "admin") {
        if (response.user?.userType !== "ADMIN") {
          await logout();
          throw new Error("Please use admin credentials for admin access");
        }
        redirectPath = "/admin-dashboard";
      } else if (response.association) {
        // Handle association login
        redirectPath = "/association-dashboard";
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
