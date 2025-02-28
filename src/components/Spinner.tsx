export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        role="status"  // Added for testing
        className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"
      ></div>
    </div>
  );
}
