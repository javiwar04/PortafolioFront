"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, User, Home, FolderOpen, Mail, Briefcase, FileText } from "lucide-react"

const getNavItems = (portfolioId: string) => [
  { href: `/portafolio/${portfolioId}`, label: "Inicio", icon: Home },
  { href: `/portafolio/${portfolioId}/proyectos`, label: "Portafolio", icon: FolderOpen },
  { href: `/portafolio/${portfolioId}/servicios`, label: "Servicios", icon: Briefcase },
  { href: `/portafolio/${portfolioId}/curriculum`, label: "Curriculum", icon: FileText },
  { href: `/portafolio/${portfolioId}/contacto`, label: "Contacto", icon: Mail },
]

export default function PortfolioNavigation({
  portfolioId,
  portfolioName,
  portfolioTitle,
}: {
  portfolioId: string
  portfolioName: string
  portfolioTitle: string
}) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = getNavItems(portfolioId)

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/portafolio/${portfolioId}`} className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">{portfolioName}</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-0.5">{portfolioTitle}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/"
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Volver a Galería
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300"
              >
                Volver a Galería
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
