"use client"
import {
    TooltipContent,
} from "@/components/ui/tooltip"

const TooltipComp = ({ text }: { text: string }) => {
    return (
        <TooltipContent>
            <p>{text}</p>
        </TooltipContent>

    )
}

export default TooltipComp
