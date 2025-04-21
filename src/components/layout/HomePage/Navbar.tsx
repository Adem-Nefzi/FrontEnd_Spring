"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HandHeart, Moon, Sun, Menu, X } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
            {/* No navigation items anymore */}
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
                {/* No navigation items */}
                <div className="flex items-center justify-between px-2">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    size="icon"
                    className="rounded-full"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isDarkMode ? "dark-mobile" : "light-mobile"}
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
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link to="/login">
                    <Button variant="default" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
