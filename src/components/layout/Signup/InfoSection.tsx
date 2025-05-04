import { Heart, Users, Shield, Gift, Award } from "lucide-react";

interface InfoSectionProps {
  userType: "donor" | "recipient";
  donorType: "individual" | "organization";
}

export default function InfoSection({ userType }: InfoSectionProps) {
  return (
    <div className="relative z-10 text-center md:text-left space-y-6 order-2 md:order-1">
      <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">
        {userType === "donor" ? <Heart size={24} /> : <Users size={24} />}
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {userType === "donor" ? "Join Our Community" : "Start Your Journey"}
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
  );
}
