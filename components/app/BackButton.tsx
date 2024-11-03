'use client'
import { ArrowBigLeft, ArrowLeft } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import Button from "../ui/Button/Button"

const BackButton = ({title}:{title?:string})=>{
    const router = useRouter()
    return(
        <Button variant="link" onClick={()=>router.back()} className="flex flex-row gap-2 items-center mb-8">
        <ArrowLeft />
        {title || 'Back to question bank'}
        </Button>
    )
}

export default BackButton