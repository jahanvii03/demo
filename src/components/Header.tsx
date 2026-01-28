
import { useAuth } from "@/context/AuthContext"
import {
  MessageSquare,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {/* <Link
            to="/"
            className="text-lg font-semibold text-foreground"
          >
            Logo
          </Link> */}

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              Chatbot
            </Link>
          </nav>
        </div>

        <div className="relative flex items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setIsUserMenuOpen((v) => !v)}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 transition hover:bg-accent focus:outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                  <User className="h-4 w-4" />
                </div>

                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">
                    {user?.name || "User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user?.email || "—"}
                  </div>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border bg-background shadow-lg">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-medium">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
