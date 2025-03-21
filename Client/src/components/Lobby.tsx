import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";

export default function Lobby() {
  const [searchParameters] = useSearchParams();
  const [camEnabled, setCamEnabled] = useState<boolean>(true);
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [audiostream, setAudioStream] = useState<MediaStreamTrack>();
  const [videoStream, setVideoStream] = useState<MediaStreamTrack>();
  const localVideo = useRef<HTMLVideoElement | null>(null);

  const AddAudioTrack = (audioTrack: MediaStreamTrack) => {
    audiostream?.stop(); // Clean up previous audio track
    if (micEnabled) {
      setAudioStream(audioTrack);
    }
  };

  const AddVideoTrack = (videoTrack: MediaStreamTrack) => {
    videoStream?.stop(); // Clean up previous video track
    if (camEnabled) {
      setVideoStream(videoTrack);
    }
  };

  const EndAllMediaTracks = () => {
    audiostream?.stop();
    videoStream?.stop();
  };

  const getVideoAndAudio = async () => {
    if (!micEnabled && !camEnabled) {
      EndAllMediaTracks();
      return;
    }

    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: micEnabled,
      video: camEnabled ? { width: 240, height: 240 } : false,
    });

    AddAudioTrack(stream.getAudioTracks()?.[0]);
    AddVideoTrack(stream.getVideoTracks()?.[0]);

    if (!localVideo.current || !camEnabled) {
      return;
    }

    let videoTrack = stream.getVideoTracks()[0];
    localVideo.current.srcObject = new MediaStream([videoTrack]);
  };

  useEffect(() => {
    getVideoAndAudio();
  }, [localVideo, micEnabled, camEnabled]);

  return (
    <div className="flex flex-row gap-5 items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {searchParameters.get("type") === "video" ? (
        <div className="relative">
          {camEnabled ? (
            <video
              ref={localVideo}
              autoPlay
              className="rounded-xl shadow-lg"
              style={{ width: 240, height: 240 }}
            ></video>
          ) : (
            <div
              className="flex items-center justify-center rounded-xl shadow-lg bg-gray-700"
              style={{ width: 240, height: 240 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
                <line x1="3" y1="3" x2="21" y2="21" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4">
            <button
              onClick={() => setCamEnabled((prev) => !prev)}
              className={`p-2 rounded-full shadow-md transition-transform transform hover:scale-110 ${
                camEnabled ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {camEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMicEnabled((prev) => !prev)}
              className={`p-2 rounded-full shadow-md transition-transform transform hover:scale-110 ${
                micEnabled ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {micEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M12 14v7" />
                  <path d="M5 14h14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M12 14v7" />
                  <path d="M5 14h14" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ) : null}
      <UserCard type={searchParameters.get("type")} />
    </div>
  );
}