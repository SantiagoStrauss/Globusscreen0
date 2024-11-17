"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, CheckCircle, Shield, Globe, Users, Briefcase, Building, Search, Database, Lock } from "lucide-react"
import { TopBar } from "@/components/ui/topbar"
import { Footer } from "@/components/ui/footer"

export const runtime = 'edge';

const translations = {
  en: {
    title: "Advanced Screening Solutions",
    subtitle: "Cutting-edge technology for comprehensive sanctions list screening",
    trustedBy: "Trusted by 500+ Global Companies",
    cuttingEdgeFeatures: "Cutting-Edge Features",
    industriesWeServe: "Industries We Serve",
    faq: "Frequently Asked Questions",
    readyToRevolutionize: "Ready to revolutionize your compliance process?",
    startFreeTrial: "Start your free trial today and experience the power of GlobusScreen",
    startFreeTrialButton: "Start Free Trial",
    solutionsTitleIndividual: "Individual Screening",
    solutionsTitleBatch: "Batch Processing",
    solutionsTitleAPI: "API Integration",
    solutionsDescriptionIndividual: "Quick and accurate screening for individual entities",
    solutionsDescriptionBatch: "Efficient screening for large datasets",
    solutionsDescriptionAPI: "Seamless integration with your existing systems",
    solutionsFeatureInstant: "Instant results",
    solutionsFeatureDetailed: "Detailed match information",
    solutionsFeatureUserFriendly: "User-friendly interface",
    solutionsFeatureUpload: "Upload CSV or Excel files",
    solutionsFeatureProcess: "Process thousands of entries",
    solutionsFeatureDownloadable: "Downloadable results",
    solutionsFeatureREST: "RESTful API",
    solutionsFeatureWebhooks: "Webhooks for real-time updates",
    solutionsFeatureDocumentation: "Comprehensive documentation",
    
    // Nested Footer Object
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
    
    // Additional Footer Properties
    individualScreening: "Individual Screening",
    batchProcessing: "Batch Processing",
    apiIntegration: "API Integration",
    
    footerCopyright: "All rights reserved.",
    
    faqQuestionAccuracy: "How accurate is GlobusScreen's matching algorithm?",
    faqAnswerAccuracy: "Our AI-powered matching algorithm boasts a 99.9% accuracy rate, significantly reducing false positives while ensuring comprehensive coverage of potential matches.",
    faqQuestionIntegration: "Can GlobusScreen integrate with my existing compliance systems?",
    faqAnswerIntegration: "Yes, GlobusScreen offers seamless integration through our RESTful API and webhooks, allowing you to incorporate our powerful screening capabilities into your existing compliance workflow.",
    faqQuestionUpdates: "How often is the sanctions database updated?",
    faqAnswerUpdates: "Our global sanctions and watchlists database is updated in real-time, ensuring that you always have access to the most current information for your screening needs.",
    
    data: "Data",
    pricing: "Pricing",
    enterprise: "Enterprise",
    login: "Log In",
    signUp: "Sign Up",
    solutions: "Solutions"
  },
  es: {
    title: "Soluciones Avanzadas de Verificación",
    subtitle: "Tecnología de vanguardia para una verificación exhaustiva de listas de sanciones",
    trustedBy: "Confiado por más de 500 empresas globales",
    cuttingEdgeFeatures: "Características de Vanguardia",
    industriesWeServe: "Industrias que Servimos",
    faq: "Preguntas Frecuentes",
    readyToRevolutionize: "¿Listo para revolucionar su proceso de cumplimiento?",
    startFreeTrial: "Comience su prueba gratuita hoy y experimente el poder de GlobusScreen",
    startFreeTrialButton: "Iniciar Prueba Gratuita",
    solutionsTitleIndividual: "Verificación Individual",
    solutionsTitleBatch: "Procesamiento por Lotes",
    solutionsTitleAPI: "Integración API",
    solutionsDescriptionIndividual: "Verificación rápida y precisa para entidades individuales",
    solutionsDescriptionBatch: "Procesamiento eficiente para grandes conjuntos de datos",
    solutionsDescriptionAPI: "Integración perfecta con sus sistemas existentes",
    solutionsFeatureInstant: "Resultados instantáneos",
    solutionsFeatureDetailed: "Información detallada de coincidencias",
    solutionsFeatureUserFriendly: "Interfaz fácil de usar",
    solutionsFeatureUpload: "Cargar archivos CSV o Excel",
    solutionsFeatureProcess: "Procesar miles de entradas",
    solutionsFeatureDownloadable: "Resultados descargables",
    solutionsFeatureREST: "API RESTful",
    solutionsFeatureWebhooks: "Webhooks para actualizaciones en tiempo real",
    solutionsFeatureDocumentation: "Documentación completa",
    
    // Nested Footer Object
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
    
    // Additional Footer Properties
    individualScreening: "Verificación Individual",
    batchProcessing: "Procesamiento por Lotes",
    apiIntegration: "Integración API",
    
    footerCopyright: "Todos los derechos reservados.",
    
    faqQuestionAccuracy: "¿Qué tan preciso es el algoritmo de coincidencia de GlobusScreen?",
    faqAnswerAccuracy: "Nuestro algoritmo de coincidencia impulsado por IA tiene una tasa de precisión del 99.9%, reduciendo significativamente los falsos positivos mientras asegura una cobertura completa de posibles coincidencias.",
    faqQuestionIntegration: "¿Puede GlobusScreen integrarse con mis sistemas de cumplimiento existentes?",
    faqAnswerIntegration: "Sí, GlobusScreen ofrece una integración perfecta a través de nuestra API RESTful y webhooks, lo que le permite incorporar nuestras potentes capacidades de verificación en su flujo de trabajo de cumplimiento existente.",
    faqQuestionUpdates: "¿Con qué frecuencia se actualiza la base de datos de sanciones?",
    faqAnswerUpdates: "Nuestra base de datos global de sanciones y listas de vigilancia se actualiza en tiempo real, lo que garantiza que siempre tenga acceso a la información más reciente para sus necesidades de verificación.",
    
    data: "Datos",
    pricing: "Precios",
    enterprise: "Empresas",
    login: "Iniciar sesión",
    signUp: "Registrarse",
    solutions: "Soluciones"
  }
};

const SolutionsPageComponent = () => {
  const [activeTab, setActiveTab] = useState("individual")
  const [animationKey, setAnimationKey] = useState(0)
  const [language, setLanguage] = useState<"en" | "es">("en");
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [activeTab])

  const solutions = [
    {
      id: "individual",
      title: { en: "Individual Screening", es: "Verificación Individual" },
      description: { en: "Quick and accurate screening for individual entities", es: "Verificación rápida y precisa para entidades individuales" },
      features: [
        { en: "Instant results", es: "Resultados instantáneos" },
        { en: "Detailed match information", es: "Información detallada de coincidencias" },
        { en: "User-friendly interface", es: "Interfaz fácil de usar" }
      ],
      icon: Users,
    },
    {
      id: "batch",
      title: { en: "Batch Processing", es: "Procesamiento por Lotes" },
      description: { en: "Efficient screening for large datasets", es: "Procesamiento eficiente para grandes conjuntos de datos" },
      features: [
        { en: "Upload CSV or Excel files", es: "Cargar archivos CSV o Excel" },
        { en: "Process thousands of entries", es: "Procesar miles de entradas" },
        { en: "Downloadable results", es: "Resultados descargables" }
      ],
      icon: Briefcase,
    },
    {
      id: "api",
      title: { en: "API Integration", es: "Integración API" },
      description: { en: "Seamless integration with your existing systems", es: "Integración perfecta con sus sistemas existentes" },
      features: [
        { en: "RESTful API", es: "API RESTful" },
        { en: "Webhooks for real-time updates", es: "Webhooks para actualizaciones en tiempo real" },
        { en: "Comprehensive documentation", es: "Documentación completa" }
      ],
      icon: Globe,
    },
  ]

  const industries = [
    { name: { en: "Banking", es: "Banca" }, icon: Building },
    { name: { en: "Finance", es: "Finanzas" }, icon: Briefcase },
    { name: { en: "Insurance", es: "Seguros" }, icon: Shield },
    { name: { en: "Technology", es: "Tecnología" }, icon: Globe },
  ]

  const coolFeatures = [
    {
      title: { en: "AI-Powered Matching", es: "Coincidencia Impulsada por IA" },
      description: {
        en: "Our advanced AI algorithms ensure the highest accuracy in entity matching, reducing false positives and enhancing efficiency.",
        es: "Nuestros algoritmos avanzados de IA aseguran la mayor precisión en la coincidencia de entidades, reduciendo falsos positivos y mejorando la eficiencia."
      },
      icon: Search,
    },
    {
      title: { en: "Real-Time Database Updates", es: "Actualizaciones de Base de Datos en Tiempo Real" },
      description: {
        en: "Stay ahead of the curve with our continuously updated global sanctions and watchlists database, ensuring you're always compliant.",
        es: "Manténgase a la vanguardia con nuestra base de datos global de sanciones y listas de vigilancia continuamente actualizada, asegurando que siempre cumpla."
      },
      icon: Database,
    },
    {
      title: { en: "Blockchain Integration", es: "Integración Blockchain" },
      description: {
        en: "Leverage the power of blockchain technology for immutable audit trails and enhanced data integrity in your screening process.",
        es: "Aproveche el poder de la tecnología blockchain para obtener registros de auditoría inmutables y una mayor integridad de los datos en su proceso de verificación."
      },
      icon: Lock,
    },
  ]

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
            {translations[language].title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations[language].subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {translations[language].trustedBy}
            </Badge>
          </motion.div>
        </section>

        <section className="mb-16">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {solutions.map((solution) => (
                <TabsTrigger key={solution.id} value={solution.id} className="text-lg">
                  {solution.title[language]}
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={animationKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {solutions.map((solution) => (
                  <TabsContent key={solution.id} value={solution.id}>
                    <Card className="border-blue-200 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
                        <div className="flex items-center space-x-4">
                          <solution.icon className="w-12 h-12 text-blue-600" />
                          <div>
                            <CardTitle className="text-2xl">{solution.title[language]}</CardTitle>
                            <CardDescription className="text-lg">{solution.description[language]}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-2">
                          {solution.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span>{feature[language]}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <Button className="w-full">Learn More</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </section>

        <section ref={sectionRef} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{translations[language].cuttingEdgeFeatures}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coolFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-blue-200 h-full bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle>{feature.title[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description[language]}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{translations[language].industriesWeServe}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-blue-200 hover:border-blue-400 transition-colors duration-300">
                <CardHeader className="text-center">
                  <industry.icon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>{industry.name[language]}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{translations[language].faq}</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{translations[language].faqQuestionAccuracy}</AccordionTrigger>
              <AccordionContent>{translations[language].faqAnswerAccuracy}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{translations[language].faqQuestionIntegration}</AccordionTrigger>
              <AccordionContent>{translations[language].faqAnswerIntegration}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{translations[language].faqQuestionUpdates}</AccordionTrigger>
              <AccordionContent>{translations[language].faqAnswerUpdates}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{translations[language].readyToRevolutionize}</h2>
          <p className="text-xl mb-8">{translations[language].startFreeTrial}</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            {translations[language].startFreeTrialButton}
            <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>
      <Footer translations={translations[language]} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SolutionsPageComponent), { ssr: false });