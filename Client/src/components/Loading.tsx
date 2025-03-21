export default function Loading(props: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {props.name}!</h1>
        <p className="text-gray-600 mt-2">Please wait while we connect you with someone...</p>
      </div>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}