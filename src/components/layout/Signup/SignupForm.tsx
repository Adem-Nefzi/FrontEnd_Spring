"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../Signup";
import {
  UserPlus,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import MapModal from "./MapModal";
import { useState } from "react";
interface SignUpFormProps {
  form: UseFormReturn<FormValues>;
  userType: "donor" | "recipient";
  setUserType: (type: "donor" | "recipient") => void;
  donorType: "individual" | "organization";
  setDonorType: (type: "individual" | "organization") => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  formStatus: {
    type: "success" | "error" | null;
    message: string;
  };
  onSubmit: (values: FormValues) => void;
  passwordStrength: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  passwordStrengthScore: number;
  setShowMap: (show: boolean) => void;
}
export default function SignUpForm({
  form,
  userType,
  setUserType,
  donorType,
  setDonorType,
  loading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  formStatus,
  onSubmit,
  passwordStrength,
  passwordStrengthScore,
  setShowMap,
}: SignUpFormProps) {
  // Use the showMap state from props
  const [showMapLocal, setShowMapLocal] = useState(false);

  // Add the handleAddressSelection function
  const handleAddressSelection = (selectedAddress: string) => {
    form.setValue("address", selectedAddress);
    setShowMapLocal(false);
  };

  return (
    <div className="glass-card w-full shadow-lg rounded-lg overflow-hidden">
      {/* Card header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 justify-center mb-2">
          <UserPlus className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
        </div>
        <p className="text-center text-muted-foreground">
          Fill in your details to get started
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

          {/* Donor Type (only for donors) */}
          {userType === "donor" && (
            <div className="space-y-2">
              <label className="text-base font-medium block">Donor Type</label>
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

          {/* Individual Donor or Recipient Fields */}
          {((userType === "donor" && donorType === "individual") ||
            userType === "recipient") && (
            <>
              {/* First Name field */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className={`flex h-10 w-full rounded-md border ${
                    "firstName" in form.formState.errors &&
                    form.formState.errors.firstName?.message
                      ? "border-destructive"
                      : "border-input"
                  } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  {...form.register("firstName")}
                />
                {"firstName" in form.formState.errors &&
                  form.formState.errors.firstName?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
              </div>

              {/* Last Name field */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className={`flex h-10 w-full rounded-md border ${
                    "lastName" in form.formState.errors &&
                    form.formState.errors.lastName
                      ? "border-destructive"
                      : "border-input"
                  } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  {...form.register("lastName")}
                />
                {"lastName" in form.formState.errors &&
                  form.formState.errors.lastName && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.lastName?.message}
                    </p>
                  )}
              </div>
            </>
          )}

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
                  "organizationName" in form.formState.errors &&
                  form.formState.errors.organizationName
                    ? "border-destructive"
                    : "border-input"
                } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                {...form.register("organizationName")}
              />
              {"organizationName" in form.formState.errors &&
                form.formState.errors.organizationName && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.organizationName.message}
                  </p>
                )}
            </div>
          )}

          {/* Email field - for all user types */}
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
                placeholder="Create a password"
                className={`flex h-10 w-full rounded-md border ${
                  "password" in form.formState.errors &&
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
            {"password" in form.formState.errors &&
              form.formState.errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}

            {/* Password strength indicator */}
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((segment) => (
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
                          : passwordStrengthScore === 4
                          ? "bg-green-400"
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
                <li className="flex items-center gap-1">
                  <span
                    className={
                      passwordStrength.special
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }
                  ></span>
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
                  "confirmPassword" in form.formState.errors &&
                  form.formState.errors.confirmPassword
                    ? "border-destructive"
                    : "border-input"
                } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10`}
                {...form.register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {"confirmPassword" in form.formState.errors &&
              form.formState.errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
          </div>

          {/* Phone field - required for organization, optional for others */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Phone Number{" "}
              {userType === "donor" && donorType === "organization"
                ? "(Required)"
                : "(Optional)"}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className={`flex h-10 w-full rounded-md border ${
                form.formState.errors.phone
                  ? "border-destructive"
                  : "border-input"
              } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Address field - required for organization, optional for others */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Address{" "}
              {userType === "donor" && donorType === "organization"
                ? "(Required)"
                : "(Optional)"}
            </label>
            <div className="flex gap-2">
              <input
                id="address"
                type="text"
                placeholder="Enter address"
                className={`flex h-10 w-full rounded-md border ${
                  form.formState.errors.address
                    ? "border-destructive"
                    : "border-input"
                } bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                {...form.register("address")}
              />
              {userType === "donor" && donorType === "organization" && (
                <button
                  type="button"
                  onClick={() => setShowMapLocal(true)}
                  className="flex items-center justify-center h-10 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Select location on map"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              )}
            </div>
            {form.formState.errors.address && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
            {showMapLocal && (
              <MapModal
                onClose={() => setShowMapLocal(false)}
                onSelectAddress={handleAddressSelection}
                initialAddress={form.getValues("address")}
              />
            )}
          </div>

          {/* Description field - only for organization donors */}
          {userType === "donor" && donorType === "organization" && (
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Organization Description (Optional)
              </label>
              <textarea
                id="description"
                placeholder="Describe your organization"
                className={`flex min-h-[80px] w-full rounded-md border ${
                  "description" in form.formState.errors &&
                  form.formState.errors.description
                    ? "border-destructive"
                    : "border-input"
                } bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                {...form.register("description")}
              />
              {"description" in form.formState.errors &&
                form.formState.errors.description && (
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            )}
            {loading ? "Creating account..." : "Create Account"}
          </button>
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
  );
}
