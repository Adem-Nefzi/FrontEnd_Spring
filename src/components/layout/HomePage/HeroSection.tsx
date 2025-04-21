import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-dot-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
            var(--primary-color-transparent) 0%, 
            transparent 50%)`,
          }}
        ></div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-grid-pattern"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-4">
              Change Lives Today
            </Badge>
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r 
    from-primary via-accent to-foreground drop-shadow-lg"
            >
              Make a Difference Today
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community of change makers and help create positive impact
            through transparent and efficient donations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="gap-2 rounded-full w-full sm:w-auto"
              >
                <Link to="/signup" className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Start Donating</span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full w-full sm:w-auto"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl"
        />
      </div>
    </div>
  );
}
