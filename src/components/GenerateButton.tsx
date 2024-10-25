"use client";

import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

const GenerateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="relative mx-auto flex h-12 w-full max-w-96 items-center justify-center gap-4 rounded-lg bg-blue-200 p-2 shadow-sm transition-all hover:opacity-80 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black/80"
      disabled={pending}
      type="submit">
      <div
        className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 ${
          pending && "opacity-0"
        }`}>
        <div className="flex items-center justify-center gap-2">
          <span className="md:text-xl">Generate Image</span>
          <SparklesIcon className="size-5 fill-pink-400 text-blue-900" />
        </div>
      </div>

      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
        {pending && <Loader2Icon className="size-5 animate-spin" />}
      </div>
    </button>
  );
};

export default GenerateButton;
