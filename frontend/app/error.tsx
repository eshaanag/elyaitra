"use client";

export default function Error() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        {/* Soft visual cue */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-gray-200" />
          <div className="absolute inset-1 rounded-full bg-gray-100" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">
            Just a small hiccup
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your tutor is still here.
            Try refreshing — you can continue right where you left off.
          </p>
        </div>

        {/* Passive guidance (not a CTA) */}
        <p className="text-[11px] text-gray-400">
          This usually fixes itself in a moment.
        </p>
      </div>
    </div>
  );
}
