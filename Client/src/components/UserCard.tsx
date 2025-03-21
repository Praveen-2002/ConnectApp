import { Link } from "react-router-dom"
import { memo, useEffect, useRef, useState } from "react";

const UserCard = memo(function(props: any) {
    const testrender = useRef(1);
    useEffect(()=>{
        console.log("UserCard Rendered: ",testrender.current)
        testrender.current +=1
    })

    const [name, setName] = useState<string>("");
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Enter Your Name</h2>

            <input
                type="text"
                className="mt-4 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name..."
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />

            <Link
                to={name ? `/${props.type}?name=${name}` : "#"}
                className={`mt-6 inline-block w-full px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-transform transform hover:scale-105 ${!name && "opacity-50 pointer-events-none"
                    }`}
            >
                Join
            </Link>
        </div>
    )
}
)

export default UserCard
