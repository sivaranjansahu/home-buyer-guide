import Link from "next/link"
import Button from "../ui/Button"
import Card from "../ui/Card"

const ProContent = ()=>{
    return(
        <Card
        title="Upgrade"
        description="This area is reserved for Pro members only. Upgrade your account today to get full access to hundreds of high quality behavioral questions, and generate STAR answers."
        footer={
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <Link href='/pricing'>
            <Button
              variant="cta"
              type="submit"
              form="couponForm"
              
            >
              Get Pro
            </Button>
            </Link>
          </div>
        }
      >
        
      </Card>
    )
}

export default ProContent