"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useEffect, useState } from "react"
import { savePortfolio, getPortfolioById, verifyPassword, generateId, type Portfolio } from "@/lib/portfolio-storage"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2, Lock } from "lucide-react"

export default function EditarUsuarioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    const portfolio = getPortfolioById(params.id)
    if (portfolio) {
      setFormData(portfolio)
    } else {
      router.push("/admin")
    }
    setLoading(false)
  }, [params.id, router])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (verifyPassword(params.id, passwordInput)) {
      setIsAuthenticated(true)
      setPasswordError("")
    } else {
      setPasswordError("Contraseña incorrecta")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      savePortfolio(formData)
      router.push("/admin")
    }
  }

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Verificación de Contraseña
            </CardTitle>
            <CardDescription>Ingresa la contraseña para editar el perfil de {formData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  required
                />
                {passwordError && <p className="text-sm text-destructive mt-1">{passwordError}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/admin">Cancelar</Link>
                </Button>
                <Button type="submit" className="flex-1">
                  Verificar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { id: generateId(), title: "", description: "", image: "", category: "", technologies: [], link: "" },
      ],
    })
  }

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    })
  }

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...formData.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setFormData({ ...formData, projects: newProjects })
  }

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { id: generateId(), title: "", description: "", icon: "", features: [] }],
    })
  }

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    })
  }

  const updateService = (index: number, field: string, value: string | string[]) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData({ ...formData, services: newServices })
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: generateId(), institution: "", degree: "", period: "", description: "" },
      ],
    })
  }

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData({ ...formData, education: newEducation })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { id: generateId(), company: "", position: "", period: "", description: "", achievements: [] },
      ],
    })
  }

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    })
  }

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const newExperience = [...formData.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setFormData({ ...formData, experience: newExperience })
  }

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: 50 }],
    })
  }

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    })
  }

  const updateSkill = (index: number, field: string, value: string | number) => {
    const newSkills = [...formData.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setFormData({ ...formData, skills: newSkills })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Panel
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">Editar Usuario</h1>
          <p className="text-muted-foreground">Actualiza la información del portafolio de {formData.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Same form structure as nuevo page */}
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos básicos del usuario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Título Profesional *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Desarrollador Full Stack"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografía *</Label>
                <Textarea
                  id="bio"
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Cuéntanos sobre ti..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="avatar">URL de Avatar</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://ejemplo.com/avatar.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Datos de contacto y redes sociales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram *</Label>
                  <Input
                    id="instagram"
                    required
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@usuario"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="usuario"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="usuario"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proyectos - Same as nuevo page */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Proyectos</CardTitle>
                  <CardDescription>Agrega los proyectos del portafolio</CardDescription>
                </div>
                <Button type="button" onClick={addProject} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Proyecto
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.projects.map((project, index) => (
                <div key={project.id} className="p-4 border rounded-lg space-y-4 relative">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título del Proyecto</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        placeholder="Mi Proyecto"
                      />
                    </div>
                    <div>
                      <Label>Categoría</Label>
                      <Input
                        value={project.category}
                        onChange={(e) => updateProject(index, "category", e.target.value)}
                        placeholder="Web App"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Descripción del proyecto..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>URL de Imagen</Label>
                      <Input
                        value={project.image}
                        onChange={(e) => updateProject(index, "image", e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                    <div>
                      <Label>Link del Proyecto</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(index, "link", e.target.value)}
                        placeholder="https://proyecto.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Tecnologías (separadas por coma)</Label>
                    <Input
                      value={project.technologies.join(", ")}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "technologies",
                          e.target.value.split(",").map((t) => t.trim()),
                        )
                      }
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Servicios */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Servicios</CardTitle>
                  <CardDescription>Agrega los servicios ofrecidos</CardDescription>
                </div>
                <Button type="button" onClick={addService} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Servicio
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.services.map((service, index) => (
                <div key={service.id} className="p-4 border rounded-lg space-y-4 relative">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeService(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título del Servicio</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, "title", e.target.value)}
                        placeholder="Desarrollo Web"
                      />
                    </div>
                    <div>
                      <Label>Icono</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(index, "icon", e.target.value)}
                        placeholder="URL del icono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateService(index, "description", e.target.value)}
                      placeholder="Descripción del servicio..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Características (separadas por coma)</Label>
                    <Input
                      value={service.features.join(", ")}
                      onChange={(e) =>
                        updateService(
                          index,
                          "features",
                          e.target.value.split(",").map((f) => f.trim()),
                        )
                      }
                      placeholder="Funcionalidad 1, Funcionalidad 2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Educación */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Educación</CardTitle>
                  <CardDescription>Agrega tu formación académica</CardDescription>
                </div>
                <Button type="button" onClick={addEducation} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Educación
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((education, index) => (
                <div key={education.id} className="p-4 border rounded-lg space-y-4 relative">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institución</Label>
                      <Input
                        value={education.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        placeholder="Universidad de Ejemplo"
                      />
                    </div>
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={education.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        placeholder="Licenciatura en Informática"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Periodo</Label>
                      <Input
                        value={education.period}
                        onChange={(e) => updateEducation(index, "period", e.target.value)}
                        placeholder="2015 - 2019"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={education.description}
                      onChange={(e) => updateEducation(index, "description", e.target.value)}
                      placeholder="Detalles de tu educación..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experiencia */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Experiencia</CardTitle>
                  <CardDescription>Agrega tu experiencia laboral</CardDescription>
                </div>
                <Button type="button" onClick={addExperience} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Experiencia
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experience.map((experience, index) => (
                <div key={experience.id} className="p-4 border rounded-lg space-y-4 relative">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Compañía</Label>
                      <Input
                        value={experience.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder="Nombre de la Compañía"
                      />
                    </div>
                    <div>
                      <Label>Puesto</Label>
                      <Input
                        value={experience.position}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                        placeholder="Desarrollador Full Stack"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Periodo</Label>
                      <Input
                        value={experience.period}
                        onChange={(e) => updateExperience(index, "period", e.target.value)}
                        placeholder="2019 - 2023"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      placeholder="Detalles de tu experiencia..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Logros (separados por coma)</Label>
                    <Input
                      value={experience.achievements.join(", ")}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "achievements",
                          e.target.value.split(",").map((a) => a.trim()),
                        )
                      }
                      placeholder="Logro 1, Logro 2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Habilidades */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Habilidades</CardTitle>
                  <CardDescription>Agrega tus habilidades técnicas</CardDescription>
                </div>
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Habilidad
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.skills.map((skill, index) => (
                <div key={skill.name} className="p-4 border rounded-lg space-y-4 relative">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre de la Habilidad</Label>
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(index, "name", e.target.value)}
                        placeholder="React"
                      />
                    </div>
                    <div>
                      <Label>Nivel (%)</Label>
                      <Input
                        type="number"
                        value={skill.level.toString()}
                        onChange={(e) => updateSkill(index, "level", Number.parseInt(e.target.value))}
                        placeholder="85"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Cancelar</Link>
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
