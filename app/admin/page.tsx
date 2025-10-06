"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getPortfolios, deletePortfolio, type Portfolio } from "@/lib/portfolio-storage"
import { UserPlus, Edit, Trash2, Eye, ArrowLeft } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    setPortfolios(getPortfolios())
  }, [])

  const handleDelete = (id: string) => {
    deletePortfolio(id)
    setPortfolios(getPortfolios())
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona todos los portafolios de usuarios</p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Link href="/admin/nuevo">
              <UserPlus className="mr-2 h-5 w-5" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>

        {portfolios.length === 0 ? (
          <Card className="text-center py-16 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-2xl">No hay portafolios registrados</CardTitle>
              <CardDescription className="text-lg">Comienza creando el primer portafolio</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-4">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
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
                      <div>
                        <CardTitle className="text-2xl">{portfolio.name}</CardTitle>
                        <CardDescription className="text-base">{portfolio.title}</CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/portafolio/${portfolio.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/editar/${portfolio.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente el portafolio de{" "}
                              {portfolio.name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(portfolio.id)}>Eliminar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{portfolio.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{portfolio.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="font-medium">{portfolio.whatsapp}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="font-medium">{portfolio.instagram}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{portfolio.projects.length} Proyectos</Badge>
                    <Badge variant="secondary">{portfolio.services.length} Servicios</Badge>
                    <Badge variant="secondary">{portfolio.education.length} Educación</Badge>
                    <Badge variant="secondary">{portfolio.experience.length} Experiencia</Badge>
                    <Badge variant="secondary">{portfolio.skills.length} Habilidades</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
