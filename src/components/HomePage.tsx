import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  HandHeart,
  Users,
  TrendingUp,
  Moon,
  Sun,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  CreditCard,
  BarChart4,
  Search,
  Linkedin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  textColor: string;
  features: string[];
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Causes",
    description: "Discover meaningful causes that align with your values.",
    color: "bg-blue-100",
    textColor: "text-blue-600",
    features: [
      "Search by category",
      "View impact metrics",
      "Read success stories",
    ],
  },
  {
    icon: CreditCard,
    title: "Make Donations",
    description: "Securely contribute to your chosen campaigns.",
    color: "bg-green-100",
    textColor: "text-green-600",
    features: ["Secure payments", "Multiple payment options", "Tax receipts"],
  },
  {
    icon: BarChart4,
    title: "Track Impact",
    description: "Monitor how your donations make a difference.",
    color: "bg-orange-100",
    textColor: "text-orange-600",
    features: ["Real-time updates", "Impact reports", "Community feedback"],
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Apply theme on component mount
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center"
              >
                <div className="relative">
                  <HandHeart className="h-8 w-8 text-primary" />
                  <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm animate-pulse" />
                </div>
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  HeartShare
                </span>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-6"
              >
                {["How it Works", "Campaigns", "About", "Contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  size="icon"
                  className="rounded-full"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isDarkMode ? "dark" : "light"}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
                <Link to="/login">
                  <Button variant="default" className="rounded-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="rounded-full">
                    Register
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4"
              >
                <div className="flex flex-col gap-4">
                  {["How it Works", "Campaigns", "About", "Contact"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                      >
                        {item}
                      </a>
                    )
                  )}
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button variant="default" className="w-full">
                      Sign In
                    </Button>
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
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
              Join our community of change makers and help create positive
              impact through transparent and efficient donations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden bg-background">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>

        {/* Gradient Overlays */}
        <div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/80 to-transparent"
          style={{ zIndex: 1 }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/80 to-transparent"
          style={{ zIndex: 1 }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title Section with Advanced Animation */}
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
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 
        w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse"
            ></div>

            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 rounded-full 
        bg-primary/10 border-primary/20 text-primary"
            >
              Simple Process
            </Badge>

            <h2
              className="text-4xl md:text-5xl font-bold mb-6 
    bg-gradient-to-r from-primary via-accent to-foreground 
    text-transparent bg-clip-text"
            >
              How HeartShare Works
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our platform simplifies generosity, transforming your compassion
              into meaningful impact through three seamless steps.
            </p>
          </motion.div>

          {/* Process Steps with Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
            {/* Connecting Animated Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden md:block absolute top-24 left-[25%] right-[25%] h-0.5 
        bg-gradient-to-r from-transparent via-primary to-transparent z-0"
            ></motion.div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
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
                {/* Outer glow effect that appears on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-200"></div>

                <Card
                  className="h-full border-none shadow-lg 
      hover:shadow-xl transition-all duration-500 
      bg-card/80 dark:bg-[#1c1917]/70 backdrop-blur-lg overflow-hidden
      group-hover:scale-[1.02] relative z-10"
                >
                  {/* Animated Gradient Border */}
                  <div
                    className="absolute inset-0 
        bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 
        dark:from-primary/30 dark:to-primary/10
        opacity-0 group-hover:opacity-100 transition-all duration-500"
                  ></div>

                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-dot-pattern opacity-5 dark:opacity-10"></div>

                  {/* Inner glow effect */}
                  <div className="absolute -inset-1 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                  <CardContent className="pt-8 pb-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`flex items-center justify-center 
            h-16 w-16 rounded-full ${step.color} 
            transform group-hover:rotate-6 transition-transform duration-500
            shadow-lg dark:shadow-primary/20 relative overflow-hidden`}
                      >
                        {/* Inner glow effect for icon */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <step.icon
                          className={`h-8 w-8 ${step.textColor} relative z-10`}
                        />
                      </div>
                      <div
                        className="flex items-center justify-center 
            h-10 w-10 rounded-full bg-primary/20 dark:bg-primary/30
            text-primary font-bold text-sm
            shadow-inner transform group-hover:scale-110 transition-transform duration-500"
                      >
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
                          className="flex items-center gap-2.5 text-sm 
              text-muted-foreground/90 dark:text-muted-foreground/80 hover:text-foreground 
              transition-all duration-300 group-hover:translate-x-0.5"
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
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              className="rounded-full group px-8 py-4 
    bg-gradient-to-r from-primary to-accent 
    hover:from-primary/90 hover:to-accent/90 
    text-white shadow-lg shadow-primary/40 
    hover:shadow-xl transition-all duration-300"
            >
              Start Your Giving Journey
              <ArrowRight
                className="ml-2 h-5 w-5 
      group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, label: "Total Donations", value: "$2.5M+" },
              { icon: Users, label: "Active Donors", value: "15K+" },
              { icon: TrendingUp, label: "Projects Funded", value: "500+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Featured Projects
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Current Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Support these verified campaigns and make a real difference in
              people's lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Clean Water Initiative",
                image:
                  "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                raised: 15000,
                goal: 20000,
              },
              {
                title: "Education for All",
                image:
                  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500",
                raised: 8000,
                goal: 12000,
              },
              {
                title: "Food Security Program",
                image:
                  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=500",
                raised: 25000,
                goal: 30000,
              },
            ].map((campaign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {campaign.title}
                    </h3>
                    <div className="space-y-2">
                      <Progress
                        value={(campaign.raised / campaign.goal) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Raised: ${campaign.raised.toLocaleString()}
                        </span>
                        <span className="font-medium">
                          Goal: ${campaign.goal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Donate Now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are creating positive change in
              communities around the world.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary" className="gap-2">
                <HandHeart className="h-5 w-5" /> Start Your Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-card py-16">
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="relative">
                  <Heart className="h-7 w-7 text-primary" />
                  <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm animate-pulse pointer-events-none"></div>
                </div>
                <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  HeartShare
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                Empowering generosity and transparent giving through innovative
                donation management. Together, we can make a difference in
                communities worldwide.
              </p>

              {/* Contact info */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hello@heartshare.org"
                  className="flex items-center text-xs text-muted-foreground gap-1.5 group hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-primary/70" />
                  <span>hello@heartshare.org</span>
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center text-xs text-muted-foreground gap-1.5 group hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-primary/70" />
                  <span>+1 (555) 123-4567</span>
                </a>
              </div>

              {/* Social Icons with Enhanced Interaction */}
              <div className="flex space-x-3">
                {[
                  {
                    icon: Facebook,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    href: "https://twitter.com",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://linkedin.com",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background/50 transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="sr-only">{social.label}</span>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping border border-primary/50 duration-700 pointer-events-none"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg relative inline-block">
                Platform
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/50 to-transparent pointer-events-none"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "How it Works", href: "#how-it-works" },
                  { name: "Browse Campaigns", href: "#campaigns" },
                  { name: "Success Stories", href: "#stories" },
                  { name: "Start a Campaign", href: "#start" },
                  { name: "For Nonprofits", href: "#nonprofits" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary 
                transition-colors duration-300 flex items-center group"
                      // onClick={(e) => console.log(`Clicked: ${link.name}`)}
                    >
                      <div className="mr-2 h-1 w-1 rounded-full bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 pointer-events-none"></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg relative inline-block">
                Company
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/50 to-transparent pointer-events-none"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "About Us", href: "#about" },
                  { name: "Our Team", href: "#team" },
                  { name: "Careers", href: "#careers" },
                  { name: "Press", href: "#press" },
                  { name: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary 
                transition-colors duration-300 flex items-center group"
                      // onClick={(e) => console.log(`Clicked: ${link.name}`)}
                    >
                      <div className="mr-2 h-1 w-1 rounded-full bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 pointer-events-none"></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg relative inline-block">
                Resources
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/50 to-transparent pointer-events-none"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "FAQs", href: "#faqs" },
                  { name: "Support Center", href: "#support" },
                  { name: "Privacy Policy", href: "#privacy" },
                  { name: "Terms of Service", href: "#terms" },
                  { name: "Blog", href: "#blog" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary 
                transition-colors duration-300 flex items-center group"
                      // onClick={(e) => console.log(`Clicked: ${link.name}`)}
                    >
                      <div className="mr-2 h-1 w-1 rounded-full bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 pointer-events-none"></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10 dark:from-primary/10 dark:to-primary/5 pointer-events-none"></div>
            <div className="p-6 rounded-xl border border-primary/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-semibold">Stay Connected</h3>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for updates on campaigns and
                    impact stories.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full h-10 px-3 py-2 bg-background/50 border border-primary/20 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
                    />
                  </div>
                  <Button
                    className="gap-1 group h-10"
                    onClick={() => console.log("Subscribe clicked")}
                  >
                    Subscribe
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform pointer-events-none" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 mt-6 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-center md:text-left text-sm text-muted-foreground">
                © {new Date().getFullYear()} HeartShare. All rights reserved.
              </p>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <a
                  href="#privacy"
                  className="hover:text-primary transition-colors"
                  // onClick={(e) => console.log("Privacy clicked")}
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="hover:text-primary transition-colors"
                  // onClick={(e) => console.log("Terms clicked")}
                >
                  Terms of Service
                </a>
                <a
                  href="#cookies"
                  className="hover:text-primary transition-colors"
                  // onClick={(e) => console.log("Cookies clicked")}
                >
                  Cookie Policy
                </a>
                <a
                  href="#accessibility"
                  className="hover:text-primary transition-colors"
                  // onClick={(e) => console.log("Accessibility clicked")}
                >
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
