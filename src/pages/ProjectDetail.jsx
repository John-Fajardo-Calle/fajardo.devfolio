import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
    const { id } = useParams()
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2">Proyecto: {id}</h2>
            <p>Detalle completo del proyecto seleccionado.</p>
        </section>
    )
}
