import { useEffect, useRef, useState } from "react";
import {useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";

export default  function Lobby() {
  const [searchParameters] = useSearchParams();
  const [camOn, setCamOn] = useState<boolean>(true);
  const [micOn, setMicOn] = useState<boolean>(true);
  const [audiostream, setAudioStream] = useState<MediaStreamTrack>();
  const [videoStream, setVideoStream] = useState<MediaStreamTrack>();
  const localVideo = useRef<any>(null);

  const AddAudioTrack = (audioTrcak: MediaStreamTrack) => {
    if (!micOn){
      audiostream?.stop();
      setAudioStream(undefined);
      return;
    }

    setAudioStream(audioTrcak)
  }

  const AddVideoTrack = (videoTrack: MediaStreamTrack) => {
    if (!camOn){
      videoStream?.stop();
      setVideoStream(undefined);
      return;
    }
    
    setVideoStream(videoTrack)
  }

  const EndAllMediaTracks = (mediaStream: MediaStream | null) => {
    audiostream?.stop();
    videoStream?.stop();

    mediaStream?.getTracks().forEach(x=>{
      if(x.readyState == 'live'){
        x.stop();
      }
    })
  }

  const getVideoAndAudio = async() =>{
    if(!micOn && !camOn){
      EndAllMediaTracks(localVideo.current?.srcObject);
      return ;
    }

    const stream = await window.navigator.mediaDevices.getUserMedia({
        audio: micOn,
        video: camOn ? {width:240,height:240} : false
        })

    AddAudioTrack(stream.getAudioTracks()?.[0])
    AddVideoTrack(stream.getVideoTracks()?.[0])
    console.log(stream.getTracks().forEach(x=>{
      if(x.readyState === 'live'){
        console.log(x)
      }
    }))

    if(!localVideo.current || !camOn){
      return;
    }

    let videoTrack = stream.getVideoTracks()[0]
    localVideo.current.srcObject =  new MediaStream([videoTrack]);
  }

  useEffect(()=>{
    getVideoAndAudio();
  },[localVideo, micOn, camOn])

  return (
    <div className="flex flex-row gap-5 items-center justify-center min-h-screen bg-gray-100">
      {searchParameters.get("type") === "video"?
        <div>
          {camOn ? <video ref={localVideo} autoPlay ></video> : <div style={{width:240,height:240,background:"#444"}}></div>}
          <button onClick={()=>setCamOn(prev => !prev)} className="mt-6 inline-block w-full px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-transform transform hover:scale-105">cam</button>
          <button onClick={()=>setMicOn(prev => !prev)} className="mt-6 inline-block w-full px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-transform transform hover:scale-105">mic</button>
        </div>
        :
        <></>
      }
      <UserCard type={searchParameters.get("type")}/>
    </div>
  );
}
