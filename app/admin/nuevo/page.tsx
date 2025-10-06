"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { savePortfolio, generateId, type Portfolio } from "@/lib/portfolio-storage"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NuevoUsuarioPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<Portfolio>({
    id: generateId(),
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    github: "",
    linkedin: "",
    avatar: "",
    password: "",
    projects: [],
    services: [],
    education: [],
    experience: [],
    skills: [],
    createdAt: "",
    updatedAt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    savePortfolio(formData)
    router.push("/admin")
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Crear Nuevo Usuario</h1>
          <p className="text-muted-foreground">Completa todos los campos para crear un portafolio completo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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

              <div>
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Contraseña para proteger el perfil"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Esta contraseña será necesaria para editar el perfil en el futuro
                </p>
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

          {/* Proyectos */}
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
                  <CardDescription>Servicios que ofrece el profesional</CardDescription>
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
                      <Label>Icono (emoji o nombre)</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(index, "icon", e.target.value)}
                        placeholder="💻"
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
                      placeholder="Diseño responsivo, SEO optimizado, Alta velocidad"
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
                  <CardDescription>Formación académica</CardDescription>
                </div>
                <Button type="button" onClick={addEducation} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Educación
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
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
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        placeholder="Universidad XYZ"
                      />
                    </div>
                    <div>
                      <Label>Título/Grado</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        placeholder="Ingeniería en Sistemas"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Período</Label>
                    <Input
                      value={edu.period}
                      onChange={(e) => updateEducation(index, "period", e.target.value)}
                      placeholder="2018 - 2022"
                    />
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(index, "description", e.target.value)}
                      placeholder="Descripción de la formación..."
                      rows={2}
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
                  <CardTitle>Experiencia Laboral</CardTitle>
                  <CardDescription>Historial profesional</CardDescription>
                </div>
                <Button type="button" onClick={addExperience} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Experiencia
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
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
                      <Label>Empresa</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                        placeholder="Desarrollador Senior"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Período</Label>
                    <Input
                      value={exp.period}
                      onChange={(e) => updateExperience(index, "period", e.target.value)}
                      placeholder="2020 - Presente"
                    />
                  </div>

                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      placeholder="Descripción del puesto..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Logros (separados por coma)</Label>
                    <Input
                      value={exp.achievements.join(", ")}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "achievements",
                          e.target.value.split(",").map((a) => a.trim()),
                        )
                      }
                      placeholder="Aumenté la eficiencia en 30%, Lideré equipo de 5 personas"
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
                  <CardDescription>Competencias técnicas y nivel de dominio</CardDescription>
                </div>
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Habilidad
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(index, "name", e.target.value)}
                      placeholder="React"
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, "level", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <Badge variant="secondary">{skill.level}%</Badge>
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeSkill(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
              Guardar Portafolio
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
