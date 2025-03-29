import { useSearchParams } from "react-router-dom"
import socket from "./api/socket"
import { FaUserCircle } from "react-icons/fa";
import Loading from "./Loading"
import { useEffect, useState } from "react"

export default function Room() {

    interface Message {
        id: number,
        message: string,
        timeStap: Date,
        isRecivedMsg: boolean
    }

    const [searchParameters] = useSearchParams();
    const [Waiting, setWaiting] = useState<boolean>(true);
    const [isInput, setIsInput] = useState<boolean>(false); // change
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [addedUserName, setAddedUserName] = useState<string>();
    const [Submited, setSubmited] = useState<boolean>(false);
    const [currentRoom, setCurrentRoom] = useState<string>();
    const [enteredMsg, setEnteredMsg] = useState<string>();
    const [messageStream, setMessageStream] = useState<Message[]>();

    useEffect(() => {

        socket.on('connect', () => {
            console.log("user connected");
            socket.emit("userName", searchParameters.get("name"))
        })

        socket.emit("check","msg");

        socket.on("No-waiting",()=>{
            setWaiting(false);
            console.log("called")
        })
        
    }, [])

    const toggleButton: Function = (e: any) => {
        // setIsInput(e.target.value === undefined)
        console.log(e)
        setIsInput(false)
    }

    const sendMessage: Function = (e: any) => {
        e.preventDefault();
        setSubmited((prev) => !prev)
        setEnteredMsg(e.target.message.value)
    }

    useEffect(() => {
        if (enteredMsg != undefined) {
            let newMessage: Message = { id: 1, message: enteredMsg as string, timeStap: new Date, isRecivedMsg: false }
            setMessageStream((prev) => {
                return prev ? [...prev, { id: 1, message: enteredMsg as string, timeStap: new Date, isRecivedMsg: false }] : [newMessage]
            })
            socket.emit("sendMessage", [currentRoom, enteredMsg])
        }
        console.log(messageStream)
    }, [Submited])

    useEffect(() => {
        socket.on("reciveMessage", (msg: string) => {
            let newMessage: Message = { id: 1, message: msg as string, timeStap: new Date, isRecivedMsg: true }
            setMessageStream((prev) => {
                console.log("updated")
                return prev ? [...prev, { id: 1, message: msg as string, timeStap: new Date, isRecivedMsg: true }] : [newMessage]
            })
        })

        socket.on("communicate", (roomName: string) => {
            console.log(roomName);
            if (roomName) {
                setCurrentRoom(roomName);
                setWaiting(false);
                socket.on("reciverName", (msg: string) => {
                    console.log(msg)
                })
            }
        })

        socket.on("userAdded",(name: string)=>{
            setIsNewUser(true);
            setAddedUserName(name)
            console.log(name)
        })

        socket.on("userDisconneted",(msg: string)=>{
            setWaiting(true);
            console.log(msg)
        })

        console.log(messageStream);
    }, [])

    return (
        <>
            {Waiting ?
                <>
                        <Loading name={searchParameters.get("name")}/>
                </>
                :
                <>
                    <div className="rounded-2xl border bg-white text-black shadow-lg h-[100vh] w-full mx-auto flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="p-4 flex items-center gap-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-2xl">
                            <FaUserCircle className="text-3xl" />
                            <p className="text-lg font-semibold">Unknown User</p>
                        </div>

                        {/* Messages - Scrollable */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                            {messageStream?.map((ele) => (
                                <div
                                    key={ele.timeStap.toTimeString()}
                                    className={`max-w-[75%] rounded-lg px-4 py-2 text-sm shadow-md ${ele.isRecivedMsg
                                        ? "ml-auto bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-900"
                                        }`}
                                >
                                    {ele.message}
                                {isNewUser && 
                                    <div className="w-full rounded-sm px-4 py-2 text-sm">
                                        {addedUserName} is add the chat
                                    </div>
                                }
                                </div>
                            ))}
                        </div>

                        {/* Input Section (Fixed at Bottom Inside Chat Box) */}
                        <div className="p-4 bg-gray-100 border-t w-full">
                            <form className="flex items-center gap-2" onSubmit={(e) => sendMessage(e)}>
                                <input
                                    className="flex-1 h-10 rounded-full border px-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    id="message"
                                    placeholder="Type your message..."
                                    onChange={(e) => toggleButton(e)}
                                    name="message"
                                />
                                <button
                                    className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md transition-all ${isInput
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                    type="submit"
                                    disabled={isInput}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-send"
                                    >
                                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                                        <path d="M22 2 11 13"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}