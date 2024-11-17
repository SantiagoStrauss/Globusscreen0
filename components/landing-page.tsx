// landing-page.tsx
'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Zap, Globe, Building, Landmark, Plane, ShoppingBag, Stethoscope, Umbrella, Phone, Car, GraduationCap, Wheat } from "lucide-react"
import { TopBar } from "@/components/ui/topbar"
import { Footer } from "@/components/ui/footer"

export const runtime = 'edge';

export function LandingPageComponent() {
  const [activeCustomer, setActiveCustomer] = useState(0)
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [animatedNumbers, setAnimatedNumbers] = useState({
    entitiesScreened: 0,
    accuracyRate: 0,
    globalWatchlists: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [heroWord, setHeroWord] = useState(language === 'en' ? 'Simple' : 'Simple')

  const customers = [
    { name: "GlobalBank", logo: "/placeholder.svg?height=80&width=80", quote: language === 'en' ? "GlobusScreen has revolutionized our compliance process." : "GlobusScreen ha revolucionado nuestro proceso de cumplimiento." },
    { name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", quote: language === 'en' ? "Efficient and reliable. A game-changer for our risk management." : "Eficiente y confiable. Un cambio de juego para nuestra gestión de riesgos." },
    { name: "MegaRetail", logo: "/placeholder.svg?height=80&width=80", quote: language === 'en' ? "Comprehensive coverage and easy to use. Highly recommended." : "Cobertura completa y fácil de usar. Altamente recomendado." },
  ]

  const industries = [
    { name: language === 'en' ? "Banking" : "Banca", icon: Landmark },
    { name: language === 'en' ? "Technology" : "Tecnología", icon: Globe },
    { name: language === 'en' ? "Retail" : "Comercio minorista", icon: ShoppingBag },
    { name: language === 'en' ? "Healthcare" : "Salud", icon: Stethoscope },
    { name: language === 'en' ? "Travel" : "Viajes", icon: Plane },
    { name: language === 'en' ? "Real Estate" : "Bienes raíces", icon: Building },
    { name: language === 'en' ? "Insurance" : "Seguros", icon: Umbrella },
    { name: language === 'en' ? "Energy" : "Energía", icon: Zap },
    { name: language === 'en' ? "Telecommunications" : "Telecomunicaciones", icon: Phone },
    { name: language === 'en' ? "Automotive" : "Automotriz", icon: Car },
    { name: language === 'en' ? "Education" : "Educación", icon: GraduationCap },
    { name: language === 'en' ? "Agriculture" : "Agricultura", icon: Wheat },
  ]

  const translations = {
    en: {
      solutions: "Solutions",
      data: "Data",
      pricing: "Pricing",
      enterprise: "Enterprise",
      login: "Login",
      signUp: "Sign Up",
      heroTitle: "Sanctions List Screening Made",
      heroSubtitle: "Ensure compliance and mitigate risks with our advanced sanctions screening service",
      getStarted: "Get Started",
      fastScreening: "Fast Screening",
      fastScreeningDesc: "Screen entities against multiple sanctions lists in seconds",
      completeCoverage: "Complete Coverage",
      completeCoverageDesc: "Access to global sanctions and watchlists",
      complianceAssurance: "Compliance Assurance",
      complianceAssuranceDesc: "Stay compliant with international regulations",
      trustedBy: "Trusted by Industry Leaders",
      byTheNumbers: "GlobusScreen by the Numbers",
      entitiesScreened: "Entities Screened",
      accuracyRate: "Accuracy Rate",
      globalWatchlists: "Global Watchlists",
      support: "Support Available",
      completeSolutions: "Complete Solutions",
      individualScreening: "Individual Screening",
      batchProcessing: "Batch Processing",
      apiIntegration: "API Integration",
      readyToStreamline: "Ready to streamline your compliance process?",
      startFreeTrial: "Start Your Free Trial",
      industriesServed: "Industries We Serve",
      footer: {
        tagline: "Ensuring global compliance, one screen at a time.",
        solutions: "Solutions",
        company: "Company",
        legal: "Legal",
        aboutUs: "About Us",
        careers: "Careers",
        contact: "Contact",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
      },
    },
    es: {
      solutions: "Soluciones",
      data: "Datos",
      pricing: "Precios",
      enterprise: "Empresas",
      login: "Iniciar sesión",
      signUp: "Registrarse",
      heroTitle: "Verificación de Listas de Sanciones Hecha",
      heroSubtitle: "Asegure el cumplimiento y mitigue riesgos con nuestro servicio avanzado de verificación de sanciones",
      getStarted: "Comenzar",
      fastScreening: "Verificación Rápida",
      fastScreeningDesc: "Verifique entidades contra múltiples listas de sanciones en segundos",
      completeCoverage: "Cobertura Completa",
      completeCoverageDesc: "Acceso a sanciones globales y listas de vigilancia",
      complianceAssurance: "Garantía de Cumplimiento",
      complianceAssuranceDesc: "Manténgase en cumplimiento con las regulaciones internacionales",
      trustedBy: "Confiado por Líderes de la Industria",
      byTheNumbers: "GlobusScreen en Números",
      entitiesScreened: "Entidades Verificadas",
      accuracyRate: "Tasa de Precisión",
      globalWatchlists: "Listas de Vigilancia Globales",
      support: "Soporte Disponible",
      completeSolutions: "Soluciones Completas",
      individualScreening: "Verificación Individual",
      batchProcessing: "Procesamiento por Lotes",
      apiIntegration: "Integración API",
      readyToStreamline: "¿Listo para optimizar su proceso de cumplimiento?",
      startFreeTrial: "Comience su Prueba Gratuita",
      industriesServed: "Industrias que Atendemos",
      footer: {
        tagline: "Asegurando el cumplimiento global, una verificación a la vez.",
        solutions: "Soluciones",
        company: "Empresa",
        legal: "Legal",
        aboutUs: "Sobre Nosotros",
        careers: "Carreras",
        contact: "Contacto",
        privacyPolicy: "Política de Privacidad",
        termsOfService: "Términos de Servicio",
      },
    },
  }

  const t = translations[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentStatsRef = statsRef.current

    if (currentStatsRef) {
      observer.observe(currentStatsRef)
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const animationDuration = 2000 // 2 seconds
      const steps = 100
      const interval = animationDuration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        setAnimatedNumbers({
          entitiesScreened: Math.min(Math.round((currentStep / steps) * 1000000), 1000000),
          accuracyRate: Math.min(parseFloat(((currentStep / steps) * 99.9).toFixed(1)), 99.9),
          globalWatchlists: Math.min(Math.round((currentStep / steps) * 200), 200),
        })

        currentStep++

        if (currentStep > steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  useEffect(() => {
    const words = language === 'en'
      ? ['Simple', 'Fast', 'Reliable', 'Complete']
      : ['Simple', 'Rápida', 'Confiable', 'Completa']
    let index = 0
    const interval = setInterval(() => {
      setHeroWord(words[index])
      index = (index + 1) % words.length
    }, 3000)
    return () => clearInterval(interval)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <TopBar
        language={language}
        toggleLanguage={toggleLanguage}
        translations={translations}
      />

      <main>
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-5xl font-bold text-blue-600 mb-4 transition-all duration-500 ease-in-out">
              {heroWord}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {t.heroSubtitle}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/signup">{t.getStarted}</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-blue-200">
              <CardHeader>
                <Zap className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.fastScreening}</CardTitle>
                <CardDescription>{t.fastScreeningDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <Shield className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.completeCoverage}</CardTitle>
                <CardDescription>{t.completeCoverageDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.complianceAssurance}</CardTitle>
                <CardDescription>{t.complianceAssuranceDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t.trustedBy}</h2>
            <div className="flex justify-center items-center space-x-8 mb-8">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    index === activeCustomer ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={() => setActiveCustomer(index)}
                >
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xl italic mb-2">&quot;{customers[activeCustomer].quote}&quot;</p>
              <p className="font-semibold">{customers[activeCustomer].name}</p>
            </div>
          </div>
        </section>

        <section ref={statsRef} className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.byTheNumbers}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.entitiesScreened.toLocaleString()}+</CardTitle>
                <CardDescription>{t.entitiesScreened}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.accuracyRate}%</CardTitle>
                <CardDescription>{t.accuracyRate}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.globalWatchlists}+</CardTitle>
                <CardDescription>{t.globalWatchlists}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">24/7</CardTitle>
                <CardDescription>{t.support}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t.completeSolutions}</h2>
            <Tabs defaultValue="individual" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual">{t.individualScreening}</TabsTrigger>
                <TabsTrigger value="batch">{t.batchProcessing}</TabsTrigger>
                <TabsTrigger value="api">{t.apiIntegration}</TabsTrigger>
              </TabsList>
              <TabsContent value="individual">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.individualScreening}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Quick and easy screening for individual entities' : 'Verificación rápida y fácil para entidades individuales'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'Instant results' : 'Resultados instantáneos'}</li>
                      <li>{language === 'en' ? 'Detailed match information' : 'Información detallada de coincidencias'}</li>
                      <li>{language === 'en' ? 'User-friendly interface' : 'Interfaz fácil de usar'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="batch">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.batchProcessing}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Efficient screening for large datasets' : 'Verificación eficiente para grandes conjuntos de datos'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'Upload CSV or Excel files' : 'Carga de archivos CSV o Excel'}</li>
                      <li>{language === 'en' ? 'Process thousands of entries' : 'Procesa miles de entradas'}</li>
                      <li>{language === 'en' ? 'Downloadable results' : 'Resultados descargables'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.apiIntegration}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Seamless integration with your existing systems' : 'Integración perfecta con sus sistemas existentes'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'RESTful API' : 'API RESTful'}</li>
                      <li>{language === 'en' ? 'Webhooks for real-time updates' : 'Webhooks para actualizaciones en tiempo real'}</li>
                      <li>{language === 'en' ? 'Comprehensive documentation' : 'Documentación completa'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.industriesServed}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-blue-200">
                <CardHeader className="text-center">
                  <industry.icon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>{industry.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t.readyToStreamline}</h2>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/signup">{t.startFreeTrial}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer translations={t} />
    </div>
  )
}