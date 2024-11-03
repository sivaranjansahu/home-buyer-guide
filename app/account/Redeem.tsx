'use client'

import Button from "@/components/ui/Button"

const Redeem = ({redeemCode}:{redeemCode:(userId: string, code: string)=> Promise<void>})=>{
    return(
        <div>
        <input placeholder='enter coupon' id="coupon-code"></input>
        <Button onClick={async()=>{await redeemCode("asdada","2dS2Sd3")}}>Validate</Button>
      </div>
    )
}

export default Redeem