"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getPortfolios, type Portfolio } from "@/lib/portfolio-storage"
import { UserPlus, Eye } from "lucide-react"

export default function HomePage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    setPortfolios(getPortfolios())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
                Galería de{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Portafolios
                </span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Explora los portafolios de nuestros profesionales
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              <Link href="/admin/nuevo">
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                <UserPlus className="mr-2 h-5 w-5 relative z-10" />
                <span className="relative z-10">Nuevo Usuario</span>
              </Link>
            </Button>
          </div>

          {/* Portfolios Grid */}
          {portfolios.length === 0 ? (
            <Card className="text-center py-16 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-2xl">No hay portafolios aún</CardTitle>
                <CardDescription className="text-lg">
                  Crea el primer portafolio haciendo clic en "Nuevo Usuario"
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio, index) => (
                <Card
                  key={portfolio.id}
                  className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm overflow-hidden relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-all duration-300">
                        {portfolio.avatar ? (
                          <img
                            src={portfolio.avatar || "/placeholder.svg"}
                            alt={portfolio.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {portfolio.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{portfolio.title}</p>
                      </div>
                    </div>

                    <CardDescription className="text-base leading-relaxed line-clamp-3">
                      {portfolio.bio}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {portfolio.projects.length} Proyectos
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {portfolio.services.length} Servicios
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {portfolio.skills.length} Habilidades
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1" variant="default">
                        <Link href={`/portafolio/${portfolio.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Portafolio
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/admin/editar/${portfolio.id}`}>Editar</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Admin Link */}
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-primary/5 hover:border-primary/50 bg-transparent"
            >
              <Link href="/admin">Administrar Todos los Usuarios →</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
