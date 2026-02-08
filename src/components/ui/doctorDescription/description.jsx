// import { useState } from "react"

import Target from "@/src/components/ui/target/target"
export default function Description({ description, value }) {
    return (
        <div className="text-(length:--p)">
            <Target size="md" position="left" variant="secondary" value={description} />
            <p className="">{value}</p>
        </div>
    )
}