import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  toggleTheme: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Header({
  isDarkMode,
  isMenuOpen,
  toggleTheme,
  setIsMenuOpen,
}: HeaderProps) {
  return (
    <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Logo />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <DesktopNav />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              <AuthButtons />
            </motion.div>
          </div>

          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <MobileMenu isMenuOpen={isMenuOpen} />
      </div>
    </nav>
  );
}

// Sub-components for Header
function Logo() {
  return (
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
  );
}

function DesktopNav() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex items-center gap-6"
    >
      {["How it Works", "Campaigns", "About", "Contact"].map((item) => (
        <motion.a
          key={item}
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {item}
        </motion.a>
      ))}
    </motion.div>
  );
}

function AuthButtons() {
  return (
    <>
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
    </>
  );
}

function MobileMenuButton({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (isOpen: boolean) => void }) {
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="rounded-full"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}

function MobileMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden py-4"
        >
          <div className="flex flex-col gap-4">
            {["How it Works", "Campaigns", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-1"
              >
                {item}
              </a>
            ))}
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
  );
}
