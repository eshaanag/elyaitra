export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Animated focus ring */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gray-900" />
        </div>

        {/* Copy */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-gray-800">
            Elyaitra
          </p>
          <p className="text-xs text-gray-500">
            Setting up your exam tutor
          </p>
        </div>
      </div>
    </div>
  );
}
