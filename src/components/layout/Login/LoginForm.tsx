"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../Login";
import type { AuthProvider } from "firebase/auth";
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
  socialLoading: string | null;
  handleSocialSignIn: (
    provider: AuthProvider,
    providerName: string
  ) => Promise<void>;
  googleProvider: AuthProvider;
}

export default function LoginForm({
  form,
  onSubmit,
  formStatus,
  showPassword,
  setShowPassword,
  loading,
  socialLoading,
  handleSocialSignIn,
  googleProvider,
}: LoginFormProps) {
  return (
    <div className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Remember me & Forgot password */}
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
  );
}
