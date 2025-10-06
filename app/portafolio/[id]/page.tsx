"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getPortfolioById, type Portfolio } from "@/lib/portfolio-storage"
import { useRouter } from "next/navigation"
import { Mail, MessageCircle, Instagram, Github, Linkedin, FolderOpen, Briefcase, FileText } from "lucide-react"
import Typewriter from "@/components/typewriter"
import AnimatedCounter from "@/components/animated-counter"

export default function PortafolioHomePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  useEffect(() => {
    const data = getPortfolioById(params.id)
    if (data) {
      setPortfolio(data)
    } else {
      router.push("/")
    }
  }, [params.id, router])

  if (!portfolio) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                  👋 Bienvenido a mi portafolio
                </Badge>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
                  Hola, soy{" "}
                  <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {portfolio.name}
                  </span>
                </h1>
                <div className="text-2xl sm:text-3xl text-muted-foreground mb-6 h-12">
                  <Typewriter texts={[portfolio.title, "Desarrollador Creativo", "Solucionador de Problemas"]} />
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
                  {portfolio.bio}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="glow-effect">
                  <Link href={`/portafolio/${params.id}/proyectos`}>
                    <FolderOpen className="mr-2 h-5 w-5" />
                    Ver Proyectos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <Link href={`/portafolio/${params.id}/contacto`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Contactar
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start mt-8">
                {portfolio.github && (
                  <a
                    href={`https://github.com/${portfolio.github}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-12 h-12 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all duration-300 group border border-border"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )}
                {portfolio.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${portfolio.linkedin}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-12 h-12 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all duration-300 group border border-border"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )}
                <a
                  href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-12 h-12 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all duration-300 group border border-border"
                >
                  <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href={`https://instagram.com/${portfolio.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-12 h-12 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all duration-300 group border border-border"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25">
                  {portfolio.avatar ? (
                    <img
                      src={portfolio.avatar || "/placeholder.svg"}
                      alt={portfolio.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-32 h-32 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={portfolio.projects.length} duration={2000} />
              </div>
              <p className="text-muted-foreground">Proyectos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={portfolio.services.length} duration={2000} />
              </div>
              <p className="text-muted-foreground">Servicios</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={portfolio.skills.length} duration={2000} />
              </div>
              <p className="text-muted-foreground">Habilidades</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={portfolio.experience.length} duration={2000} />
              </div>
              <p className="text-muted-foreground">Experiencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Explora Mi Trabajo</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Descubre más sobre mis proyectos, servicios y experiencia
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">Portafolio</CardTitle>
                <CardDescription className="text-center">Explora mis proyectos y trabajos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href={`/portafolio/${params.id}/proyectos`}>Ver Proyectos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">Servicios</CardTitle>
                <CardDescription className="text-center">Conoce los servicios que ofrezco</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href={`/portafolio/${params.id}/servicios`}>Ver Servicios</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">Curriculum</CardTitle>
                <CardDescription className="text-center">Revisa mi experiencia y educación</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href={`/portafolio/${params.id}/curriculum`}>Ver Curriculum</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 via-card/50 to-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Estoy disponible para nuevos proyectos y colaboraciones. ¡Hablemos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 glow-effect">
              <Link href={`/portafolio/${params.id}/contacto`}>
                <Mail className="mr-2 h-5 w-5" />
                Contactar Ahora
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <a href={`mailto:${portfolio.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                Enviar Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
