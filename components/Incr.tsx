'use client'
const Incr = ({increment}:{increment:any})=>{
    return(
        <button onClick={()=>increment()}>increment</button>
    )
}

export default Incr;