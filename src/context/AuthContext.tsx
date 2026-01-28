import { createContext, useContext, useEffect, useState } from "react"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  isLoggedIn: boolean
  loading: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuth = localStorage.getItem("isLoggedIn")
    const storedUser = localStorage.getItem("user")

    if (storedAuth === "true" && storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
