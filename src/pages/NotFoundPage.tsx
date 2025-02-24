export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a href="/" className="text-white mt-6 px-6 py-3 bg-blue-500 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition">
        Return Home
      </a>
    </div>
  );
}
