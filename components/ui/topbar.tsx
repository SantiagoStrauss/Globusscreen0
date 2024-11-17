// components/TopBar.tsx
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  language: 'en' | 'es';
  toggleLanguage: () => void;
  translations: {
    [key: string]: any;
  };
}

export const TopBar: React.FC<TopBarProps> = ({ language, toggleLanguage, translations }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            GlobusScreen
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/solutions-page" className="text-gray-600 hover:text-blue-600">{t.solutions}</Link>
            <Link href="/data-page" className="text-gray-600 hover:text-blue-600">{t.data}</Link>
            <Link href="/pricing-page" className="text-gray-600 hover:text-blue-600">{t.pricing}</Link>
            <Link href="/enterprise-page" className="text-gray-600 hover:text-blue-600">{t.enterprise}</Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              {t.login}
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/sign-up">{t.signUp}</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={handleMobileMenuToggle} className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/solutions-page" className="block text-gray-600 hover:text-blue-600">{t.solutions}</Link>
            <Link href="/data-page" className="block text-gray-600 hover:text-blue-600">{t.data}</Link>
            <Link href="/pricing-page" className="block text-gray-600 hover:text-blue-600">{t.pricing}</Link>
            <Link href="/enterprise-page" className="block text-gray-600 hover:text-blue-600">{t.enterprise}</Link>
            <Link href="/dashboard-page" className="block text-blue-600 hover:underline">
              {t.login}
            </Link>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/auth-page?mode=signup">{t.signUp}</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="w-full"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};