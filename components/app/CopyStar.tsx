'use client'
import { Copy } from "lucide-react"
import  Button  from "../ui/Button"
import { copyText, formatJsonToHumanReadable } from "./GenerateSection"
//import { toast } from "../ui/use-toast"
import { starResponse } from "@/types/entities"
import { toast } from "../ui/toast/use-toast"

const CopyStar = ({ starResp }: { starResp: starResponse|undefined }) => {
    if(!starResp) return;
    return (
        <Button
            onClick={() => {
                copyText(formatJsonToHumanReadable(starResp));
                toast({
                    title: "Copied STAR answer",
                    variant:"success"

                });
            }}
            className="flex flex-row items-center gap-2"
        >
            <Copy size={16} />
        </Button>
    )
}

export default CopyStar