"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Database, Globe, Shield, RefreshCcw } from "lucide-react"
import { TopBar } from "@/components/ui/topbar"
import { Footer } from "@/components/ui/footer"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
} from "recharts"

export const runtime = 'edge';

const translations = {
  en: {
    title: "Comprehensive Global Data",
    subtitle: "Powering compliance with unparalleled depth and breadth",
    dataPoints: "Data Points",
    countries: "Countries Covered",
    updateFrequency: "Update Frequency",
    sources: "Trusted Sources",
    exploreData: "Explore Our Data",
    dataOverview: "Data Overview",
    dataInsights: "Data Insights",
    dataQuality: "Data Quality",
    clientTestimonials: "Client Testimonials",
    startExploring: "Start Exploring Our Data",
    contactSales: "Contact Sales",
    sanctions: "Sanctions",
    pep: "PEP",
    adverseMedia: "Adverse Media",
    lawEnforcement: "Law Enforcement",
    dataUpdated: "Data Updated",
    daily: "Daily",
    accuracy: "Accuracy",
    coverage: "Coverage",
    consistency: "Consistency",
    dataGrowth: "Data Growth Over Time",
    dataBreakdown: "Data Source Breakdown",
    qualityAssurance: "Our Commitment to Quality",
    qualityDescription: "At GlobusScreen, we prioritize data quality to ensure our clients receive the most accurate and up-to-date information for their compliance needs.",
    testimonial1: "GlobusScreen's extensive data coverage has significantly enhanced our risk assessment capabilities.",
    testimonial2: "The depth and accuracy of GlobusScreen's data have been instrumental in our compliance efforts.",
    client1: "Sarah Johnson, Compliance Officer at Global Financial Services",
    client2: "Michael Chen, Risk Manager at TechInnovate Corp",
    solutions: "Solutions",
    data: "Data",
    pricing: "Pricing",
    enterprise: "Enterprise",
    login: "Log In",
    signUp: "Sign Up",
    
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
  },
  es: {
    title: "Datos Globales Integrales",
    subtitle: "Impulsando el cumplimiento con una profundidad y amplitud sin igual",
    dataPoints: "Puntos de Datos",
    countries: "Países Cubiertos",
    updateFrequency: "Frecuencia de Actualización",
    sources: "Fuentes Confiables",
    exploreData: "Explora Nuestros Datos",
    dataOverview: "Resumen de Datos",
    dataInsights: "Perspectivas de Datos",
    dataQuality: "Calidad de Datos",
    clientTestimonials: "Testimonios de Clientes",
    startExploring: "Comienza a Explorar Nuestros Datos",
    contactSales: "Contactar a Ventas",
    sanctions: "Sanciones",
    pep: "PEP",
    adverseMedia: "Medios Adversos",
    lawEnforcement: "Aplicación de la Ley",
    dataUpdated: "Datos Actualizados",
    daily: "Diariamente",
    accuracy: "Precisión",
    coverage: "Cobertura",
    consistency: "Consistencia",
    dataGrowth: "Crecimiento de Datos a lo Largo del Tiempo",
    dataBreakdown: "Desglose de Fuentes de Datos",
    qualityAssurance: "Nuestro Compromiso con la Calidad",
    qualityDescription: "En GlobusScreen, priorizamos la calidad de los datos para garantizar que nuestros clientes reciban la información más precisa y actualizada para sus necesidades de cumplimiento.",
    testimonial1: "La extensa cobertura de datos de GlobusScreen ha mejorado significativamente nuestras capacidades de evaluación de riesgos.",
    testimonial2: "La profundidad y precisión de los datos de GlobusScreen han sido fundamentales en nuestros esfuerzos de cumplimiento.",
    client1: "Sarah Johnson, Oficial de Cumplimiento en Global Financial Services",
    client2: "Michael Chen, Gerente de Riesgos en TechInnovate Corp",
    solutions: "Soluciones",
    data: "Datos",
    pricing: "Precios",
    enterprise: "Empresas",
    login: "Iniciar Sesión",
    signUp: "Registrarse",
    
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
  },
}

const dataGrowth = [
  { name: "2018", value: 50 },
  { name: "2019", value: 75 },
  { name: "2020", value: 110 },
  { name: "2021", value: 160 },
  { name: "2022", value: 230 },
  { name: "2023", value: 320 },
]

const dataBreakdown = [
  { name: "Sanctions", value: 30 },
  { name: "PEP", value: 25 },
  { name: "Adverse Media", value: 20 },
  { name: "Law Enforcement", value: 25 },
]

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]

export default function EnhancedDataPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [activeTab, setActiveTab] = useState("overview")
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const t = translations[language]

  const DataPoint = ({ icon: Icon, value, label }: { icon: React.ComponentType<any>, value: string, label: string }) => (
    <motion.div
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      whileHover={{ y: -5 }}
    >
      <Icon className="w-12 h-12 text-blue-600 mb-4" />
      <span className="text-4xl font-bold text-blue-600 mb-2">{value}</span>
      <span className="text-sm text-gray-600 text-center">{label}</span>
    </motion.div>
  )

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
        <section className="text-center mb-24">
          <motion.h1
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DataPoint icon={Database} value="500M+" label={t.dataPoints} />
            <DataPoint icon={Globe} value="200+" label={t.countries} />
            <DataPoint icon={RefreshCcw} value={t.daily} label={t.updateFrequency} />
            <DataPoint icon={Shield} value="1000+" label={t.sources} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              {t.exploreData}
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>

        <section ref={ref} className="mb-24">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-blue-100 p-2 rounded-full">
              <TabsTrigger value="overview" className="rounded-full">{t.dataOverview}</TabsTrigger>
              <TabsTrigger value="insights" className="rounded-full">{t.dataInsights}</TabsTrigger>
              <TabsTrigger value="quality" className="rounded-full">{t.dataQuality}</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-blue-600">{t.dataOverview}</CardTitle>
                      <CardDescription className="text-lg">
                        {language === "en"
                          ? "Explore the breadth and depth of our global data coverage"
                          : "Explora la amplitud y profundidad de nuestra cobertura de datos global"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[t.sanctions, t.pep, t.adverseMedia, t.lawEnforcement].map((source, index) => (
                          <Card key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
                            <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
                              {["30M+", "50M+", "100M+", "20M+"][index]}
                            </CardTitle>
                            <CardDescription className="text-lg">{source}</CardDescription>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="insights">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-blue-600">{t.dataInsights}</CardTitle>
                      <CardDescription className="text-lg">
                        {language === "en"
                          ? "Visualize our data growth and composition"
                          : "Visualiza nuestro crecimiento y composición de datos"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 text-blue-600">{t.dataGrowth}</h3>
                          <div className="relative h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={dataGrowth}>
                                <defs>
                                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                  }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
                                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6, fill: '#3B82F6' }} activeDot={{ r: 8 }} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 text-blue-600">{t.dataBreakdown}</h3>
                          <div className="relative h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={dataBreakdown}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  paddingAngle={5}
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  labelLine={false}
                                >
                                  {dataBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="quality">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-blue-600">{t.qualityAssurance}</CardTitle>
                      <CardDescription className="text-lg">{t.qualityDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: t.accuracy, value: "99.9%" },
                          { label: t.coverage, value: "200+" },
                          { label: t.consistency, value: "100%" },
                        ].map((item, index) => (
                          <Card key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
                            <CardTitle className="text-4xl font-bold text-blue-600 mb-2">{item.value}</CardTitle>
                            <CardDescription className="text-lg">{item.label}</CardDescription>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">{t.clientTestimonials}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { quote: t.testimonial1, author: t.client1 },
              { quote: t.testimonial2, author: t.client2 },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardDescription className="text-xl italic">&ldquo;{testimonial.quote}&rdquo;</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-blue-600">{testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">{t.startExploring}</h2>
          <div className="flex justify-center">
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600 text-lg px-12 py-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              {t.contactSales}
            </Button>
          </div>
        </section>
      </main>

      <Footer translations={translations[language]} />
    </div>
  )
}