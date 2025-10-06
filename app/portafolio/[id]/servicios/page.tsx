"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPortfolioById, type Portfolio } from "@/lib/portfolio-storage"
import { useRouter } from "next/navigation"

export default function ServiciosPage({ params }: { params: { id: string } }) {
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Mis{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            Soluciones profesionales adaptadas a tus necesidades
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {portfolio.services.length === 0 ? (
            <Card className="text-center py-16 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-2xl">No hay servicios aún</CardTitle>
                <CardDescription className="text-lg">Los servicios aparecerán aquí una vez agregados</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.services.map((service) => (
                <Card
                  key={service.id}
                  className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm relative overflow-hidden"
                >
                  <CardHeader>
                    <div className="text-5xl mb-4 text-center">{service.icon}</div>
                    <CardTitle className="text-xl text-center group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {service.features.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button asChild className="w-full transition-colors duration-300 bg-transparent" variant="outline">
                      <Link href={`/portafolio/${params.id}/contacto`}>Solicitar Información</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
