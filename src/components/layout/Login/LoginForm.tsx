"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../Login";
import {
  Check,
  AlertCircle,
  Loader2,
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

interface LoginFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  formStatus: {
    type: "success" | "error" | null;
    message: string;
  };
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  loading: boolean;
}

export default function LoginForm({
  form,
  onSubmit,
  formStatus,
  showPassword,
  setShowPassword,
  loading,
}: LoginFormProps) {
  return (
    <div className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Status message - remains exactly the same */}
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

        {/* Email field - unchanged */}
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

        {/* Password field - unchanged */}
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
              aria-label={showPassword ? "Hide password" : "Show password"}
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

        {/* Remember me checkbox - unchanged */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 rounded-sm border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-ring"
              {...form.register("rememberMe")}
            />
            <label htmlFor="remember-me" className="text-sm font-normal">
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit button - unchanged */}
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
      </form>

      {/* Sign up link - unchanged */}
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
  );
}
