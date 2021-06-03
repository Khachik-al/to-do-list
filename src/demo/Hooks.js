import { React, useState, useEffect } from "react"




export default function Hooks() {

    //let [counts, setCount] = useState({ count1: 10, count2: 12 })
    let [count1,setCount1]=useState(10)
    let [count2,setCount2]=useState(12)


    useEffect(()=>{
        console.log('Didmount or didupdate');
    })

    return (
        <div>


            <h1>{count1}</h1>
            <h2>{count2}</h2>

            <button
                onClick={() => { setCount1(count1+1) }}
                >
                chenge count1
            </button>
            <button
                onClick={() => { setCount2( count2+1) }}
                >
                chenge count2
            </button>


        </div>
    )
}