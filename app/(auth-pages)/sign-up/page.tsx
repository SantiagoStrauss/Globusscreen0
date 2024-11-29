'use client'
import { Suspense, useState, useMemo } from "react"
import { signUpAction } from "@/app/actions"
import { FormMessage } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'
import { useSearchParams } from "next/navigation"

export const runtime = 'edge';


function SignupForm({ language, translations }: { language: 'en' | 'es', translations: any }) {
  const searchParams = useSearchParams()
  const [errors, setErrors] = useState<{email?: string, password?: string, firstName?: string, lastName?: string, confirmPassword?: string}>({})
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const t = translations[language]
  const messageParam = searchParams.get('message')
  const errorParam = searchParams.get('error')
  const message = messageParam || ''
  const serverError = errorParam || ''

  const validateForm = (formData: FormData) => {
    const newErrors: {email?: string, password?: string, firstName?: string, lastName?: string, confirmPassword?: string} = {}
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email) {
      newErrors.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.errors.emailInvalid
    }

    if (!password) {
      newErrors.password = t.errors.passwordRequired
    } else if (password.length < 6) {
      newErrors.password = t.errors.passwordLength
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event:any) => {
    const newErrors: {email?: string, password?: string, firstName?: string, lastName?: string, confirmPassword?: string} = {}
    setConfirmPassword(event.target.value);
    console.log(confirmPassword, password)
    if (password !== event.target.value && (password.length === event.target.value.length || password.length < event.target.value.length)) {
      newErrors.confirmPassword = t.errors.passwordsDontMatch;
    } else {
      newErrors.confirmPassword = '';
    }
    setErrors(newErrors);
  };
  

  const handleSubmit = async (formData: FormData) => {
    if (validateForm(formData)) {
      await signUpAction(formData)
    }
  }

  if (messageParam) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={{ message }} />
      </div>
    )
  }

  return (
    <CardContent>
      <form className="flex flex-col gap-4" action={handleSubmit}>
        {serverError && (
            <div className="p-3 rounded bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="firstName">{t.firstName}</Label>
          <Input
              id="firstName"
              name="firstName"
              placeholder="Daniel Santiago"
              required
              className={`w-full ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t.lastName}</Label>
          <Input
              id="lastName"
              name="lastName"
              placeholder="Cruz Diaz"
              required
              className={`w-full ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className={`w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t.password}</Label>
          <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className={`w-full ${errors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={handlePasswordChange}
          />
          {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
          <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              minLength={6}
              required
              className={`w-full ${errors.password ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <SubmitButton pendingText="Signing up..." formAction={handleSubmit}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
          {t.signUpButton}
        </SubmitButton>
        {message && <FormMessage message={{message}}/>}
      </form>
    </CardContent>
  )
}

export default function Signup() {
  const [language, setLanguage] = useState<'en' | 'es'>('en')

  const translations = useMemo(() => ({
    en: {
      signUp: "Sign up",
      signIn: "Sign in",
      email: "Email",
      firstName: "First name",
      lastName: "Last name",
      password: "Password",
      confirmPassword: "Confirm password",
      alreadyAccount: "Already have an account?",
      createAccount: "Create an account",
      signUpButton: "Sign up",
      errors: {
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email",
        passwordRequired: "Password is required",
        passwordLength: "Password must be at least 6 characters",
        passwordsDontMatch: "Passwords don't match"
      }
    },
    es: {
      signUp: "Registrarse",
      signIn: "Iniciar sesión",
      email: "Correo electrónico",
      firstName: "Nombres",
      lastName: "Apellidos",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      alreadyAccount: "¿Ya tienes una cuenta?",
      createAccount: "Crear una cuenta",
      signUpButton: "Registrarse",
      errors: {
        emailRequired: "El correo electrónico es requerido",
        emailInvalid: "Ingrese un correo electrónico válido",
        passwordRequired: "La contraseña es requerida",
        passwordLength: "La contraseña debe tener al menos 6 caracteres",
        passwordsDontMatch: "Las contraseñas no coinciden"
      }
    }
  }), [])

  const t = translations[language]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">{t.signUp}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              className="bg-white/50 hover:bg-white/80 transition-colors"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
          <CardDescription className="text-sm text-foreground">
            {t.alreadyAccount}{" "}
            <Link className="text-blue-600 font-medium underline" href="/sign-in">
              {t.signIn}
            </Link>
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm language={language} translations={translations} />
        </Suspense>
        <CardFooter className="text-center text-sm text-gray-600">
          {t.alreadyAccount}{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            {t.signIn}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
