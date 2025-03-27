import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [userType, setUserType] = useState<"donor" | "recipient" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate signup processing
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", meets: password.length >= 8 },
    { id: 2, text: "One uppercase letter", meets: /[A-Z]/.test(password) },
    { id: 3, text: "One number", meets: /[0-9]/.test(password) },
    {
      id: 4,
      text: "One special character",
      meets: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="min-h-screen w-full auth-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/10 blur-xl animate-float" />
      <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-accent/10 blur-xl animate-float-slower" />

      <Card className="relative w-full max-w-lg p-8 glass-card border-none">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-lg">
              <div className="flex items-center justify-center w-full h-full rounded-full bg-background">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Create Account
            </h1>
            <p className="text-muted-foreground">Choose your account type</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={userType === "donor" ? "default" : "outline"}
              className={`h-24 flex-col transition-all duration-300 hover:shadow-lg ${
                userType === "donor"
                  ? "shadow-lg shadow-primary/20 bg-gradient-to-br from-primary/90 to-primary/70"
                  : ""
              }`}
              onClick={() => setUserType("donor")}
            >
              <Heart
                className={`h-8 w-8 transition-all duration-500 ${
                  userType === "donor"
                    ? "scale-110 text-background animate-pulse"
                    : "text-primary"
                }`}
              />
              <span className="mt-2">Join as Donor</span>
            </Button>
            <Button
              variant={userType === "recipient" ? "default" : "outline"}
              className={`h-24 flex-col transition-all duration-300 hover:shadow-lg ${
                userType === "recipient"
                  ? "shadow-lg shadow-secondary/20 bg-gradient-to-br from-secondary/90 to-secondary/70"
                  : ""
              }`}
              onClick={() => setUserType("recipient")}
            >
              <Users
                className={`h-8 w-8 transition-all duration-500 ${
                  userType === "recipient"
                    ? "scale-110 text-background animate-pulse"
                    : "text-secondary"
                }`}
              />
              <span className="mt-2">Join as Recipient</span>
            </Button>
          </div>

          {userType && (
            <form
              className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-muted-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="transition-all duration-300 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-muted-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="transition-all duration-300 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="transition-all duration-300 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="transition-all duration-300 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/50 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-2 space-y-1 text-sm">
                    {passwordRequirements.map((req) => (
                      <div key={req.id} className="flex items-center">
                        <Check
                          className={`h-3 w-3 mr-2 ${
                            req.meets
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={
                            req.meets
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-muted-foreground"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="transition-all duration-300 focus:shadow-md focus:shadow-primary/10 focus:ring-2 focus:ring-primary/50 pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className={`w-full group ${
                  userType === "donor"
                    ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    : "bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary"
                }`}
                disabled={
                  isSubmitting || password !== confirmPassword || !password
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
