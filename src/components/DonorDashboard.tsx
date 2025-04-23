import { Suspense } from "react";
import DonorDashboard from "@/components/layout/Donor Dashboard/DonorDashboard";
import DashboardSkeleton from "@/components/layout/Donor Dashboard/DashboardSkeleton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <Suspense fallback={<DashboardSkeleton />}>
            <DonorDashboard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
