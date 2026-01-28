import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"


const EMAIL_DOMAINS = [
  { label: "Microsoft", value: "@Microsoft.com" },
  { label: "Amazon", value: "@Amazon.com" },
  { label: "Meta", value: "@Meta.com" },
]

export default function Login() {
  const [username, setUsername] = useState("")
  const [domain, setDomain] = useState(EMAIL_DOMAINS[0].value)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<{
    username?: string
    password?: string
  }>({})

  const { login } = useAuth()
  const navigate = useNavigate()

  const email = `${username}${domain}`


  const isValidUsername = (value: string) => {
    return /^[a-zA-Z0-9._-]+$/.test(value)
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validate = () => {
    const newErrors: typeof errors = {}

    if (!username.trim()) {
      newErrors.username = "Email is required"
    } else if (!isValidUsername(username)) {
      newErrors.username =
        "Only letters, numbers, dots, underscores and hyphens allowed"
    } else if (!isValidEmail(email)) {
      newErrors.username = "Invalid email format"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      console.log({ email, password })

      login({
        name: username.split(".")[0],
        email,
      })

      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <Card className="w-full max-w-md rounded-2xl bg-white/80 shadow-xl backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in with your work account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      setErrors((prev) => ({ ...prev, username: undefined }))
                    }}
                    placeholder="username"
                    className={cn(
                      "pl-9",
                      errors.username &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </div>

                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-0 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {EMAIL_DOMAINS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-muted-foreground">
                {email}
              </p>

              {errors.username && (
                <p className="text-xs text-red-600">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  placeholder="••••••••"
                  className={cn(
                    "pl-9",
                    errors.password &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>

              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-slate-900 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
