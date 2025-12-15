// import { useState } from "react"
export default function Description({ description, value }) {
    return (
        <div className="text-(length:--p)">
            <p className="text-gray-300">{description}</p>
            <p className="">{value}</p>
        </div>
    )
}