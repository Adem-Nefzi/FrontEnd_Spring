"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignUpPageUI from "@/components/layout/Signup/SignupPage";

// Form schema creator
const createFormSchema = (
  userType: "donor" | "recipient",
  donorType: "individual" | "organization"
) => {
  // Base schema for all user types
  const baseSchema = {
    email: z.string().email("Please enter a valid email"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
  };

  // Individual donor schema
  if (userType === "donor" && donorType === "individual") {
    return z
      .object({
        ...baseSchema,
        firstName: z
          .string()
          .min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string(),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
  }

  // Organization donor schema
  if (userType === "donor" && donorType === "organization") {
    return z.object({
      ...baseSchema,
      organizationName: z.string().min(2, "Organization name is required"),
      phone: z.string().min(1, "Phone number is required"),
      address: z.string().min(1, "Address is required"),
      description: z.string().optional(),
    });
  }

  // Recipient schema
  return z
    .object({
      ...baseSchema,
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string(),
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

  // Create form schema based on user type
  const formSchema = createFormSchema(userType, donorType);

  // Initialize form with default values based on user type
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(userType, donorType),
    mode: "onChange",
  });

  // Reset form when user type changes
  useEffect(() => {
    form.reset(getDefaultValues(userType, donorType));
  }, [userType, donorType, form]);

  // Get default values based on user type
  function getDefaultValues(
    userType: "donor" | "recipient",
    donorType: "individual" | "organization"
  ) {
    const baseValues = {
      email: "",
      termsAccepted: true as const,
    };

    if (userType === "donor" && donorType === "individual") {
      return {
        ...baseValues,
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
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

    // Recipient
    return {
      ...baseValues,
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    };
  }

  // Handle form submission
  function onSubmit(values: FormValues) {
    setLoading(true);
    setFormStatus({ type: null, message: "" });

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setLoading(false);
      setFormStatus({
        type: "success",
        message: "Account created successfully! Redirecting to login...",
      });

      // Simulate redirect
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
        window.location.href = "/login";
      }, 2000);
    }, 1500);
  }

  // Handle map selection
  const handleMapSelection = (address: string) => {
    form.setValue("address", address);
    setShowMap(false);
  };

  // Password strength indicators
  const passwordValue = form.watch("password") as string | undefined;
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
