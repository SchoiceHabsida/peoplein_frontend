'use client'

import { Card } from "@/app/components/card/Card"
import { useEffect } from "react"



export default function FavoritesPage() {
    useEffect(() => {
        console.log('get favorites')
    }, [])
  return (<div className="mt-5 flex gap-5 flex-wrap">
    <Card />
  </div>
  )
}
