
import { signInAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-600">Sign In</CardTitle>
          <CardDescription className="text-sm text-foreground">
            Don't have an account?{" "}
            <Link className="text-foreground font-medium underline" href="/sign-up">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="you@example.com" required className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link className="text-xs text-foreground underline" href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <Input type="password" id="password" name="password" placeholder="Your password" required className="w-full" />
            </div>
            <SubmitButton pendingText="Signing In..." formAction={signInAction} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}