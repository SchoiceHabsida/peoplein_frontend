'use client'

import { Card } from "@/app/components/card/Card"
import { useEffect } from "react"



export default function SearchPage() {
    useEffect(() => {
        console.log('get applicants')
    }, [])
  return (<div className="mt-5 flex gap-5 flex-wrap">
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
  )
}
