export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  link?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
}

export interface Portfolio {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  whatsapp: string
  instagram: string
  github?: string
  linkedin?: string
  avatar: string
  password: string
  projects: Project[]
  services: Service[]
  education: Education[]
  experience: Experience[]
  skills: { name: string; level: number }[]
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "portfolios"

export function getPortfolios(): Portfolio[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function getPortfolioById(id: string): Portfolio | null {
  const portfolios = getPortfolios()
  return portfolios.find((p) => p.id === id) || null
}

export function verifyPassword(id: string, password: string): boolean {
  const portfolio = getPortfolioById(id)
  return portfolio ? portfolio.password === password : false
}

export function savePortfolio(portfolio: Portfolio): void {
  const portfolios = getPortfolios()
  const index = portfolios.findIndex((p) => p.id === portfolio.id)

  if (index >= 0) {
    portfolios[index] = { ...portfolio, updatedAt: new Date().toISOString() }
  } else {
    portfolios.push({
      ...portfolio,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios))
}

export function deletePortfolio(id: string): void {
  const portfolios = getPortfolios()
  const filtered = portfolios.filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function generateId(): string {
  return `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
