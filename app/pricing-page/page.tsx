"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Check, X, Zap, Users, Globe } from "lucide-react"
import { TopBar } from "@/components/ui/topbar"
import { Footer } from "@/components/ui/footer"

export const runtime = 'edge';

interface FooterTranslations {
  tagline: string;
  solutions: string;
  company: string;
  legal: string;
  aboutUs: string;
  careers: string;
  contact: string;
  privacyPolicy: string;
  termsOfService: string;
}

interface Translation {
  title: string;
  subtitle: string;
  monthlyBilling: string;
  annualBilling: string;
  saveText: string;
  getStarted: string;
  contactSales: string;
  mostPopular: string;
  basic: string;
  pro: string;
  enterprise: string;
  perMonth: string;
  billed: string;
  basicDescription: string;
  proDescription: string;
  enterpriseDescription: string;
  features: string;
  customQuote: string;
  solutions: string;
  data: string;
  pricing: string;
  login: string;
  signUp: string;
  footerSolutions: string;
  footerCompany: string;
  footerLegal: string;
  footerAboutUs: string;
  footerCareers: string;
  footerContact: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCopyright: string;
  footerDescription: string;
  footer: FooterTranslations;
  individualScreening: string;
  batchProcessing: string;
  apiIntegration: string;
}

interface TranslationsType {
  en: Translation;
  es: Translation;
}

const translations: TranslationsType = {
  en: {
    title: "Transparent Pricing for Every Business",
    subtitle: "Choose the plan that fits your needs",
    monthlyBilling: "Monthly Billing",
    annualBilling: "Annual Billing",
    saveText: "Save 20%",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
    mostPopular: "Most Popular",
    basic: "Basic",
    pro: "Pro",
    enterprise: "Enterprise",
    perMonth: "/month",
    billed: "billed annually",
    basicDescription: "For small businesses getting started with compliance",
    proDescription: "For growing businesses with advanced compliance needs",
    enterpriseDescription: "For large organizations with complex compliance requirements",
    features: "Features",
    customQuote: "Custom Quote",
    solutions: "Solutions",
    data: "Data",
    pricing: "Pricing",
    login: "Log In",
    signUp: "Sign Up",
    footerSolutions: "Solutions",
    footerCompany: "Company",
    footerLegal: "Legal",
    footerAboutUs: "About Us",
    footerCareers: "Careers",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopyright: "All rights reserved.",
    footerDescription: "Ensuring global compliance, one screen at a time.",
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
    individualScreening: "Individual Screening",
    batchProcessing: "Batch Processing",
    apiIntegration: "API Integration",
  },
  es: {
    title: "Precios Transparentes para Cada Negocio",
    subtitle: "Elige el plan que se adapte a tus necesidades",
    monthlyBilling: "Facturación Mensual",
    annualBilling: "Facturación Anual",
    saveText: "Ahorra 20%",
    getStarted: "Comenzar",
    contactSales: "Contactar Ventas",
    mostPopular: "Más Popular",
    basic: "Básico",
    pro: "Pro",
    enterprise: "Empresa",
    perMonth: "/mes",
    billed: "facturado anualmente",
    basicDescription: "Para pequeñas empresas que comienzan con el cumplimiento",
    proDescription: "Para empresas en crecimiento con necesidades avanzadas de cumplimiento",
    enterpriseDescription: "Para grandes organizaciones con requisitos complejos de cumplimiento",
    features: "Características",
    customQuote: "Cotización Personalizada",
    solutions: "Soluciones",
    data: "Datos",
    pricing: "Precios",
    login: "Iniciar sesión",
    signUp: "Registrarse",
    footerSolutions: "Soluciones",
    footerCompany: "Compañía",
    footerLegal: "Legal",
    footerAboutUs: "Acerca de nosotros",
    footerCareers: "Carreras",
    footerContact: "Contacto",
    footerPrivacy: "Política de privacidad",
    footerTerms: "Términos de servicio",
    footerCopyright: "Todos los derechos reservados.",
    footerDescription: "Asegurando el cumplimiento global, una verificación a la vez.",
    footer: {
      tagline: "Asegurando el cumplimiento global, una verificación a la vez.",
      solutions: "Soluciones",
      company: "Compañía",
      legal: "Legal",
      aboutUs: "Acerca de nosotros",
      careers: "Carreras",
      contact: "Contacto",
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
    },
    individualScreening: "Verificación Individual",
    batchProcessing: "Procesamiento por Lotes",
    apiIntegration: "Integración API",
  },
}

const pricingPlans = [
  {
    name: { en: "Basic", es: "Básico" },
    description: { en: "For small businesses getting started with compliance", es: "Para pequeñas empresas que comienzan con el cumplimiento" },
    price: { monthly: 99, annual: 79 },
    features: [
      { name: { en: "Up to 1,000 screenings/month", es: "Hasta 1,000 verificaciones/mes" }, included: true },
      { name: { en: "Basic sanctions lists", es: "Listas de sanciones básicas" }, included: true },
      { name: { en: "Email support", es: "Soporte por correo electrónico" }, included: true },
      { name: { en: "API access", es: "Acceso a API" }, included: false },
      { name: { en: "Custom integrations", es: "Integraciones personalizadas" }, included: false },
    ],
  },
  {
    name: { en: "Pro", es: "Pro" },
    description: { en: "For growing businesses with advanced compliance needs", es: "Para empresas en crecimiento con necesidades avanzadas de cumplimiento" },
    price: { monthly: 299, annual: 239 },
    features: [
      { name: { en: "Up to 10,000 screenings/month", es: "Hasta 10,000 verificaciones/mes" }, included: true },
      { name: { en: "Extended sanctions lists", es: "Listas de sanciones extendidas" }, included: true },
      { name: { en: "24/7 phone & email support", es: "Soporte 24/7 por teléfono y correo" }, included: true },
      { name: { en: "API access", es: "Acceso a API" }, included: true },
      { name: { en: "Custom integrations", es: "Integraciones personalizadas" }, included: false },
    ],
    popular: true,
  },
  {
    name: { en: "Enterprise", es: "Empresa" },
    description: { en: "For large organizations with complex compliance requirements", es: "Para grandes organizaciones con requisitos complejos de cumplimiento" },
    price: "custom",
    features: [
      { name: { en: "Unlimited screenings", es: "Verificaciones ilimitadas" }, included: true },
      { name: { en: "All sanctions lists + custom lists", es: "Todas las listas de sanciones + listas personalizadas" }, included: true },
      { name: { en: "24/7 dedicated support", es: "Soporte dedicado 24/7" }, included: true },
      { name: { en: "Advanced API access", es: "Acceso avanzado a API" }, included: true },
      { name: { en: "Custom integrations", es: "Integraciones personalizadas" }, included: true },
    ],
  },
]

export default function PricingPageComponent() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [annualBilling, setAnnualBilling] = useState(true)

  const t = translations[language]

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

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            className="flex justify-center items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className={`text-sm ${annualBilling ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>{t.monthlyBilling}</span>
            <Switch
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <span className={`text-sm ${annualBilling ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{t.annualBilling}</span>
            <Badge variant="secondary" className="text-xs">{t.saveText}</Badge>
          </motion.div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name[language]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`flex flex-col h-full ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                <CardHeader>
                  {plan.popular && (
                    <Badge className="self-start mb-2" variant="secondary">
                      {t.mostPopular}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl">{plan.name[language]}</CardTitle>
                  <CardDescription>{plan.description[language]}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {plan.price === "custom" ? (
                    <div className="text-4xl font-bold mb-4">{t.customQuote}</div>
                  ) : (
                    <div className="text-4xl font-bold mb-4">
                      ${annualBilling ? 
                        (typeof plan.price !== 'string' ? plan.price.annual : '') : 
                        (typeof plan.price !== 'string' ? plan.price.monthly : '')}
                      <span className="text-lg font-normal">{t.perMonth}</span>
                    </div>
                  )}
                  {annualBilling && plan.price !== "custom" && (
                    <p className="text-sm text-gray-500 mb-4">{t.billed}</p>
                  )}
                  <h4 className="font-semibold mb-2">{t.features}:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mr-2" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-500'}>
                          {feature.name[language]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.price === "custom" ? t.contactSales : t.getStarted}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Why Choose GlobusScreen?' : '¿Por qué elegir GlobusScreen?'}</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-600 mx-auto" />
                <CardTitle>{language === 'en' ? 'Lightning Fast' : 'Ultrarrápido'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? 'Screen entities in seconds, not hours.' : 'Verifica entidades en segundos, no en horas.'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mx-auto" />
                <CardTitle>{language === 'en' ? 'User-Friendly' : 'Fácil de usar'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? 'Intuitive interface for all team members.' : 'Interfaz intuitiva para todos los miembros del equipo.'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="w-12 h-12 text-blue-600 mx-auto" />
                <CardTitle>{language === 'en' ? 'Global Coverage' : 'Cobertura global'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'en' ? 
                  'Access to worldwide sanctions and watchlists.' :
                  'Acceso a sanciones y listas de vigilancia de todo el mundo.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ?
            'Ready to streamline your compliance process?' :
            '¿Listo para optimizar su proceso de cumplimiento?'}
          </h2>
          <p className="text-xl mb-8">{language === 'en' ?
            'Start your free trial today and experience the power of GlobusScreen' :
            'Comience su prueba gratuita hoy y experimente el poder de GlobusScreen'}
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            {language === 'en' ? 'Start Free Trial' : 'Iniciar Prueba Gratuita'}
            <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>

      <Footer translations={translations[language]} />
    </div>
  )
}