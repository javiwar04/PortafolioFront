"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPortfolioById, type Portfolio } from "@/lib/portfolio-storage"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Award, Briefcase, GraduationCap } from "lucide-react"
import SkillBar from "@/components/skill-bar"

export default function CurriculumPage({ params }: { params: { id: string } }) {
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
            Mi{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Curriculum
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            Experiencia profesional, educación y habilidades
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance flex items-center justify-center">
                <Award className="w-8 h-8 mr-3 text-primary" />
                Habilidades Técnicas
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6">
              {portfolio.skills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} percentage={skill.level} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance flex items-center justify-center">
                <Briefcase className="w-8 h-8 mr-3 text-primary" />
                Experiencia Profesional
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8">
              {portfolio.experience.map((exp) => (
                <Card
                  key={exp.id}
                  className="bg-card/90 backdrop-blur-sm border-0 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl text-primary">{exp.position}</CardTitle>
                        <CardDescription className="text-lg font-medium text-foreground mt-1">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        {exp.location && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Logros principales:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance flex items-center justify-center">
                <GraduationCap className="w-8 h-8 mr-3 text-primary" />
                Educación y Certificaciones
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.education.map((edu) => (
                <Card
                  key={edu.id}
                  className="bg-card/90 backdrop-blur-sm border-0 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{edu.degree}</CardTitle>
                    <CardDescription className="font-medium text-foreground">{edu.institution}</CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {edu.period}
                    </div>
                  </CardHeader>

                  {edu.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Interesado en trabajar conmigo?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Estoy disponible para nuevos proyectos y oportunidades de colaboración.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 glow-effect">
              <Link href={`/portafolio/${params.id}/contacto`}>Contactar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href={`/portafolio/${params.id}/proyectos`}>Ver Proyectos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
