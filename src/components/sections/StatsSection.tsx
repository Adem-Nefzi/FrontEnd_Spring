
import { Heart, Users, TrendingUp, LucideIcon } from "lucide-react";
import StatCard from "../cards/StatCard";

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { icon: Heart, label: "Total Donations", value: "$2.5M+" },
  { icon: Users, label: "Active Donors", value: "15K+" },
  { icon: TrendingUp, label: "Projects Funded", value: "500+" },
];

export default function StatsSection() {
  return (
    <div className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
