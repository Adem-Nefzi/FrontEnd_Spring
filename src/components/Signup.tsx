"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthService } from "@/api/auth";
import SignUpPageUI from "@/components/layout/Signup/SignupPage";

// Form schema creator
const createFormSchema = (
  userType: "donor" | "recipient",
  donorType: "individual" | "organization"
) => {
  const baseSchema = {
    email: z.string().email("Please enter a valid email"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  };

  if (userType === "donor" && donorType === "individual") {
    return z
      .object({
        ...baseSchema,
        firstName: z
          .string()
          .min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
  }

  if (userType === "donor" && donorType === "organization") {
    return z
      .object({
        ...baseSchema,
        organizationName: z.string().min(2, "Organization name is required"),
        phone: z.string().min(1, "Phone number is required"),
        address: z.string().min(1, "Address is required"),
        description: z.string().optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
  }

  // Recipient schema
  return z
    .object({
      ...baseSchema,
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export default function SignUpPage() {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [donorType, setDonorType] = useState<"individual" | "organization">(
    "individual"
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showMap, setShowMap] = useState(false);

  const formSchema = createFormSchema(userType, donorType);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(userType, donorType),
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(getDefaultValues(userType, donorType));
  }, [userType, donorType, form]);

  function getDefaultValues(
    userType: "donor" | "recipient",
    donorType: "individual" | "organization"
  ) {
    const baseValues = {
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: true as const,
    };

    if (userType === "donor" && donorType === "individual") {
      return {
        ...baseValues,
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      };
    }

    if (userType === "donor" && donorType === "organization") {
      return {
        ...baseValues,
        organizationName: "",
        phone: "",
        address: "",
        description: "",
      };
    }

    return {
      ...baseValues,
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };
  }

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setFormStatus({ type: null, message: "" });

    try {
      if (userType === "donor" && donorType === "individual") {
        // Type assertion for individual donor
        const individualValues = values as {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          phone?: string;
          address?: string;
        };

        await AuthService.registerUser({
          firstName: individualValues.firstName,
          lastName: individualValues.lastName,
          email: individualValues.email,
          password: individualValues.password,
          userType: "DONOR",
        });
      } else if (userType === "donor" && donorType === "organization") {
        const orgValues = values as {
          organizationName: string;
          email: string;
          password: string;
          phone: string;
          address: string;
          description?: string;
        };

        await AuthService.registerAssociation({
          firstName: "Organization", // Default value for organization
          lastName: "Admin", // Default value for organization
          email: orgValues.email,
          password: orgValues.password,
          userType: "DONOR",
          associationName: orgValues.organizationName,
          associationEmail: orgValues.email,
          associationPhone: orgValues.phone,
          associationAddress: orgValues.address,
          description: orgValues.description,
          category: "OTHER",
          logoUrl: "", // Add empty string if not provided
        });
      } else {
        const recipientValues = values as {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          phone?: string;
          address?: string;
        };

        await AuthService.registerUser({
          firstName: recipientValues.firstName,
          lastName: recipientValues.lastName,
          email: recipientValues.email,
          password: recipientValues.password,
          userType: "RECIPIENT",
        });
      }
      setFormStatus({
        type: "success",
        message: "Account created! Redirecting to login...",
      });
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
            error !== null &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "data" in error.response &&
            error.response.data &&
            typeof error.response.data === "object" &&
            "message" in error.response.data &&
            typeof error.response.data.message === "string"
          ? error.response.data.message
          : "Registration failed. Please try again.";

      setFormStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleMapSelection = (address: string) => {
    form.setValue("address", address);
    setShowMap(false);
  };

  const passwordValue = form.watch("password");
  const passwordStrength = {
    length: (passwordValue || "").length >= 8,
    uppercase: /[A-Z]/.test(passwordValue || ""),
    lowercase: /[a-z]/.test(passwordValue || ""),
    number: /[0-9]/.test(passwordValue || ""),
    special: /[^A-Za-z0-9]/.test(passwordValue || ""),
  };

  const passwordStrengthScore =
    Object.values(passwordStrength).filter(Boolean).length;

  return (
    <SignUpPageUI
      form={form}
      userType={userType}
      setUserType={setUserType}
      donorType={donorType}
      setDonorType={setDonorType}
      loading={loading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      formStatus={formStatus}
      onSubmit={onSubmit}
      passwordStrength={passwordStrength}
      passwordStrengthScore={passwordStrengthScore}
      showMap={showMap}
      setShowMap={setShowMap}
      handleMapSelection={handleMapSelection}
    />
  );
}
