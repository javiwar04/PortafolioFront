"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPortfolioById, type Portfolio } from "@/lib/portfolio-storage"
import PortfolioNavigation from "@/components/portfolio-navigation"
import { Particles } from "@/components/particles"

export default function PortfolioLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getPortfolioById(params.id)
    if (data) {
      setPortfolio(data)
    } else {
      router.push("/")
    }
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando portafolio...</p>
      </div>
    )
  }

  if (!portfolio) {
    return null
  }

  return (
    <>
      <Particles />
      <PortfolioNavigation portfolioId={params.id} portfolioName={portfolio.name} portfolioTitle={portfolio.title} />
      {children}
    </>
  )
}
