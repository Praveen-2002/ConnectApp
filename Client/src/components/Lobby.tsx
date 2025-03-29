import { useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";
import VideoCard from "./VideoCard";

export default function Lobby() {
  const [searchParameters] = useSearchParams();
  return (
    <div className="flex flex-row gap-5 items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {searchParameters.get("type") === "video" && <VideoCard /> }
      <UserCard type={searchParameters.get("type")} />
    </div>
  );
}