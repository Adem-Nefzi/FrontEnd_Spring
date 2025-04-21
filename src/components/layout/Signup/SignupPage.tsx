"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../Signup";
import InfoSection from "./InfoSection";
import SignUpForm from "./SignupForm";
import MapModal from "./MapModal";

interface SignUpPageUIProps {
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
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  handleMapSelection: (address: string) => void;
}

export default function SignUpPageUI({
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
  showMap,
  setShowMap,
  handleMapSelection,
}: SignUpPageUIProps) {
  return (
    <div className="min-h-screen auth-background floating-shapes flex items-center justify-center p-4 md:p-8">
      {/* Main content */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-70 animate-pulse-slow delay-700"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/10 rounded-full blur-xl opacity-50 animate-float-slow"></div>

        {/* Left side - Info */}
        <InfoSection userType={userType} />

        {/* Right side - Form */}
        <div className="relative z-10 order-1 md:order-2">
          <SignUpForm
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
            setShowMap={setShowMap}
          />

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/20 animate-float-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-secondary/20 animate-float-slow delay-700"></div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <MapModal
          onClose={() => setShowMap(false)}
          onSelectAddress={handleMapSelection}
        />
      )}
    </div>
  );
}
