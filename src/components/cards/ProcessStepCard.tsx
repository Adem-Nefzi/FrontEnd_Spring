import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ProcessStepCardProps {
  step: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    textColor: string;
    features: string[];
  };
  index: number;
}

export default function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-200"></div>

      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-card/80 dark:bg-[#1c1917]/70 backdrop-blur-lg overflow-hidden group-hover:scale-[1.02] relative z-10">
        {/* Card content */}
        <CardContent className="pt-8 pb-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div
              className={`flex items-center justify-center h-16 w-16 rounded-full ${step.color} transform group-hover:rotate-6 transition-transform duration-500 shadow-lg dark:shadow-primary/20 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <step.icon
                className={`h-8 w-8 ${step.textColor} relative z-10`}
              />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 dark:bg-primary/30 text-primary font-bold text-sm shadow-inner transform group-hover:scale-110 transition-transform duration-500">
              {index + 1}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground/90 mb-5">
            {step.description}
          </p>

          <ul className="space-y-3">
            {step.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, x: 3 }}
                className="flex items-center gap-2.5 text-sm text-muted-foreground/90 dark:text-muted-foreground/80 hover:text-foreground transition-all duration-300 group-hover:translate-x-0.5"
              >
                <div className="h-5 w-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                </div>
                <span className="font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
