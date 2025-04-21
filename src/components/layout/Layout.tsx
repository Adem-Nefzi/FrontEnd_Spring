import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  toggleTheme: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export default function Layout({
  isDarkMode,
  isMenuOpen,
  toggleTheme,
  setIsMenuOpen,
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        toggleTheme={toggleTheme}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="overflow-hidden">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
