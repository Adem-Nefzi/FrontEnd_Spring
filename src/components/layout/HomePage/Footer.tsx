import { Button } from "@/components/ui/button";
import {
  Heart,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
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
                <Button className="gap-1 group h-10">
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
              >
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#accessibility"
                className="hover:text-primary transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
