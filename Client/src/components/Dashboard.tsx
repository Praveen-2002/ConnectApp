import { Link } from "react-router-dom";

export default function Dashboard() {
  const buttons = [
    { name: "Chat", url: "/lobby?type=chat" },
    { name: "Video call", url: "/lobby?type=video" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900">Welcome to Connect</h2>
        <p className="text-gray-600 mt-2">
          Talk to strangers all around the world or join a community you like.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {buttons.map((ele) => (
            <Link
              key={ele.url}
              to={ele.url}
              className="px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              {ele.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

