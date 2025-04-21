import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  description: string;
}

export default function SectionHeader({
  badgeText,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true }}
      className="text-center mb-16 relative"
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>

      <Badge
        variant="outline"
        className="mb-4 px-4 py-1.5 rounded-full bg-primary/10 border-primary/20 text-primary"
      >
        {badgeText}
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-foreground text-transparent bg-clip-text">
        {title}
      </h2>

      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        {description}
      </p>
    </motion.div>
  );
}
