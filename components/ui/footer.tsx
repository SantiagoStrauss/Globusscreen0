// components/ui/Footer.tsx
'use client'

import Link from "next/link"

interface FooterProps {
  translations: {
    footer: {
      tagline: string
      solutions: string
      company: string
      legal: string
      aboutUs: string
      careers: string
      contact: string
      privacyPolicy: string
      termsOfService: string
    }
    individualScreening: string
    batchProcessing: string
    apiIntegration: string
  }
}

export const Footer: React.FC<FooterProps> = ({ translations }) => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">GlobusScreen</h3>
            <p className="text-sm">{translations.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{translations.footer.solutions}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline">{translations.individualScreening}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{translations.batchProcessing}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{translations.apiIntegration}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{translations.footer.company}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline">{translations.footer.aboutUs}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{translations.footer.careers}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{translations.footer.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{translations.footer.legal}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline">{translations.footer.privacyPolicy}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{translations.footer.termsOfService}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 GlobusScreen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}