import { useEffect, useRef, useState } from 'react'

export default function Test() {
    const val = useRef<string>("");
    const [name,setname] = useState("");

    useEffect(()=>{
        val.current = name
        console.log("called")
    },[name])

  return (
    <div>
        <input
          type="text"
          className="mx-5 my-9 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your name..."
          autoFocus
          onChange={e => setname(e.target.value)}
        />
        <p className='m-5'>Current Name: <strong>{name}</strong></p>
        <p className='m-5'>Prev Name: <strong>{val.current}</strong> </p>
    </div>
  )
}
