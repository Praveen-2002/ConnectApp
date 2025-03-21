import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Lobby() {
  const [name, setName] = useState<string>("");
  const [searchParameters] = useSearchParams();
  const type = searchParameters.get("type");
  const [audostream, setAudioStream] = useState<MediaStreamTrack>();
  const [videoStream, setVideoStream] = useState<MediaStreamTrack>();
  const localVideo = useRef<any>(null);

  const getVideo = async() =>{
    const stream = await window.navigator.mediaDevices.getUserMedia({video: {width:250,height:250}, audio: true})
    let videoTrack = stream.getVideoTracks()[0]
    setAudioStream(stream.getAudioTracks()[0]);
    setVideoStream(videoTrack);
    if(!localVideo.current){
      return;
    }
    localVideo.current.srcObject =  new MediaStream([videoTrack]);
  }

  useEffect(()=>{
    if(localVideo && localVideo.current){
      getVideo();
    }
  },[localVideo])

  return (
    <div className="flex flex-row gap-5 items-center justify-center min-h-screen bg-gray-100">
      {type === "video"?
        <div>
          <video ref={localVideo} autoPlay></video>
          <button>cam</button>
          <button>mic</button>
        </div>
        :
        <></>
      }
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
          to={name ? `/${type}?name=${name}` : "#"}
          className={`mt-6 inline-block w-full px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-transform transform hover:scale-105 ${
            !name && "opacity-50 pointer-events-none"
          }`}
        >
          Join
        </Link>
      </div>
    </div>
  );
}
