"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  UserPlus,
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
  Shield,
  Gift,
  Award,
  CheckCircle2,
} from "lucide-react";

// Form schema creator
const createFormSchema = (
  userType: "donor" | "recipient",
  donorType: "individual" | "organization"
) => {
  return z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string(),
      ...(userType === "donor" && donorType === "organization"
        ? {
            organizationName: z
              .string()
              .min(2, "Organization name is required"),
          }
        : {}),
      ...(userType === "recipient"
        ? {
            category: z.string().min(1, "Please select a category"),
            description: z
              .string()
              .min(10, "Description must be at least 10 characters"),
          }
        : {}),
      termsAccepted: z.literal(true, {
        errorMap: () => ({
          message: "You must accept the terms and conditions",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
};

export default function SignUpPage() {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [donorType, setDonorType] = useState<"individual" | "organization">(
    "individual"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formStep, setFormStep] = useState(0);

  // Create form schema based on user type
  const formSchema = createFormSchema(userType, donorType);
  type FormValues = z.infer<typeof formSchema>;

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      ...(userType === "donor" && donorType === "organization"
        ? { organizationName: "" }
        : {}),
      ...(userType === "recipient"
        ? {
            category: "",
            description: "",
          }
        : {}),
      termsAccepted: true,
    },
    mode: "onChange",
  });

  // Reset form when user type changes
  useEffect(() => {
    form.reset({
      name: form.getValues("name"),
      email: form.getValues("email"),
      password: form.getValues("password"),
      confirmPassword: form.getValues("confirmPassword"),
      ...(userType === "donor" && donorType === "organization"
        ? { organizationName: form.getValues("organizationName") || "" }
        : {}),
      ...(userType === "recipient"
        ? {
            category: form.getValues("category") || "",
            description: form.getValues("description") || "",
          }
        : {}),
      termsAccepted: form.getValues("termsAccepted"),
    });
  }, [userType, donorType]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

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

  // Next step validation
  const goToNextStep = async () => {
    let fieldsToValidate: Array<keyof FormValues> = [];

    if (formStep === 0) {
      fieldsToValidate = ["name", "email"] as Array<keyof FormValues>;
      if (userType === "donor" && donorType === "organization") {
        fieldsToValidate.push("organizationName" as keyof FormValues);
      }
    } else if (formStep === 1) {
      fieldsToValidate = ["password", "confirmPassword"] as Array<keyof FormValues>;
    }

    const result = await form.trigger(fieldsToValidate);
    if (result) {
      setFormStep(formStep + 1);
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

  // Password strength indicators
  const passwordValue = form.watch("password") as string | undefined;
  const passwordStrength = {
    length: (passwordValue || "").length >= 8,
    uppercase: /[A-Z]/.test(passwordValue || ""),
    lowercase: /[a-z]/.test(passwordValue || ""),
    number: /[0-9]/.test(passwordValue || ""),
  };

  const passwordStrengthScore =
    Object.values(passwordStrength).filter(Boolean).length;

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
              {userType === "donor"
                ? "Join Our Community"
                : "Start Your Journey"}
            </h1>
            <p className="text-muted-foreground max-w-md">
              {userType === "donor"
                ? "Create an account to start making a difference through your generous donations."
                : "Register your organization to connect with donors and receive the support you need."}
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
            <div className="relative w-full rounded-lg overflow-hidden bg-card/50 border border-border/50">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Why join us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                      <Shield size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure Platform</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data and donations are protected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                      <Gift size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Transparent Giving</h4>
                      <p className="text-sm text-muted-foreground">
                        Track where your donations go
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                      <Award size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Make an Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        Help causes that matter to you
                      </p>
                    </div>
                  </div>
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
                <UserPlus className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-center">
                  Create Account
                </h2>
              </div>
              <p className="text-center text-muted-foreground">
                Fill in your details to get started
              </p>

              {/* Progress indicator */}
              <div className="mt-4 flex justify-center">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      formStep >= 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`w-12 h-1 ${
                      formStep >= 1 ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      formStep >= 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`w-12 h-1 ${
                      formStep >= 2 ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      formStep >= 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>
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

                {/* Step 1: Basic Information */}
                {formStep === 0 && (
                  <>
                    {/* Donor Type (only for donors) */}
                    {userType === "donor" && (
                      <div className="space-y-2">
                        <label className="text-base font-medium block">
                          Donor Type
                        </label>
                        <div className="flex gap-4 p-3 bg-background/50 rounded-md border border-input">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="individual"
                              name="donorType"
                              value="individual"
                              checked={donorType === "individual"}
                              onChange={() => setDonorType("individual")}
                              className="h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring"
                            />
                            <label htmlFor="individual">Individual</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="organization"
                              name="donorType"
                              value="organization"
                              checked={donorType === "organization"}
                              onChange={() => setDonorType("organization")}
                              className="h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring"
                            />
                            <label htmlFor="organization">Organization</label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Name field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className={`flex h-10 w-full rounded-md border ${
                          form.formState.errors.name
                            ? "border-destructive"
                            : "border-input"
                        } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                        {...form.register("name")}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Organization Name (only for organization donors) */}
                    {userType === "donor" && donorType === "organization" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="organizationName"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Organization Name
                        </label>
                        <input
                          id="organizationName"
                          type="text"
                          placeholder="Enter organization name"
                          className={`flex h-10 w-full rounded-md border ${
                            form.formState.errors.organizationName
                              ? "border-destructive"
                              : "border-input"
                          } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          {...form.register("organizationName")}
                        />
                        {form.formState.errors.organizationName && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.organizationName.message}
                          </p>
                        )}
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
                  </>
                )}

                {/* Step 2: Password */}
                {formStep === 1 && (
                  <>
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
                          placeholder="Create a password"
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
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.password && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.password.message}
                        </p>
                      )}

                      {/* Password strength indicator */}
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((segment) => (
                            <div
                              key={segment}
                              className={`h-1.5 flex-1 rounded-full ${
                                passwordStrengthScore >= segment
                                  ? passwordStrengthScore === 1
                                    ? "bg-destructive"
                                    : passwordStrengthScore === 2
                                    ? "bg-orange-500"
                                    : passwordStrengthScore === 3
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-muted"
                              }`}
                            ></div>
                          ))}
                        </div>

                        <ul className="text-xs space-y-1 mt-1">
                          <li className="flex items-center gap-1">
                            <span
                              className={
                                passwordStrength.length
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {passwordStrength.length ? (
                                <CheckCircle2 className="h-3 w-3 inline" />
                              ) : (
                                "○"
                              )}
                            </span>
                            <span>At least 8 characters</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <span
                              className={
                                passwordStrength.uppercase
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {passwordStrength.uppercase ? (
                                <CheckCircle2 className="h-3 w-3 inline" />
                              ) : (
                                "○"
                              )}
                            </span>
                            <span>At least one uppercase letter</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <span
                              className={
                                passwordStrength.lowercase
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {passwordStrength.lowercase ? (
                                <CheckCircle2 className="h-3 w-3 inline" />
                              ) : (
                                "○"
                              )}
                            </span>
                            <span>At least one lowercase letter</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <span
                              className={
                                passwordStrength.number
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {passwordStrength.number ? (
                                <CheckCircle2 className="h-3 w-3 inline" />
                              ) : (
                                "○"
                              )}
                            </span>
                            <span>At least one number</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Confirm Password field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={`flex h-10 w-full rounded-md border ${
                            form.formState.errors.confirmPassword
                              ? "border-destructive"
                              : "border-input"
                          } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10`}
                          {...form.register("confirmPassword")}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.confirmPassword && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Step 3: Additional Information */}
                {formStep === 2 && (
                  <>
                    {/* Category (only for recipients) */}
                    {userType === "recipient" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="category"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className={`flex h-10 w-full rounded-md border ${
                            form.formState.errors.category
                              ? "border-destructive"
                              : "border-input"
                          } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          {...form.register("category")}
                        >
                          <option value="">Select category</option>
                          <option value="education">Education</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="environment">Environment</option>
                          <option value="humanitarian">Humanitarian</option>
                          <option value="other">Other</option>
                        </select>
                        {form.formState.errors.category && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.category.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Description (only for recipients) */}
                    {userType === "recipient" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="description"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          placeholder="Describe your organization and needs"
                          className={`flex min-h-[80px] w-full rounded-md border ${
                            form.formState.errors.description
                              ? "border-destructive"
                              : "border-input"
                          } bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.description.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border bg-background/50">
                        <input
                          type="checkbox"
                          id="termsAccepted"
                          className="h-4 w-4 rounded-sm border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring"
                          {...form.register("termsAccepted")}
                        />
                        <div className="space-y-1 leading-none">
                          <label
                            htmlFor="termsAccepted"
                            className="text-sm font-medium leading-none"
                          >
                            I agree to the terms of service and privacy policy
                          </label>
                          {form.formState.errors.termsAccepted && (
                            <p className="text-sm font-medium text-destructive">
                              {form.formState.errors.termsAccepted.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  {formStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormStep(formStep - 1)}
                      className="py-2 px-4 rounded-md border border-input bg-background hover:bg-accent/50 transition-colors"
                    >
                      Back
                    </button>
                  )}

                  {formStep < 2 ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="ml-auto py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="ml-auto flex items-center justify-center py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <UserPlus className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                      )}
                      {loading ? "Creating account..." : "Create Account"}
                    </button>
                  )}
                </div>
              </form>

              {/* Sign in link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    Sign in <ArrowRight className="ml-1 h-3 w-3" />
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
