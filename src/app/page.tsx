"use client";

import GenerateButton from "@/components/GenerateButton";
import ImageUpload from "@/components/ImageUpload";
import { formatSlug, randomString } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { useRef } from "react";

const HomePage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const downloadImage = (url: string, title: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formatSlug(title)}-${randomString(6)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="relative flex h-dvh w-dvw items-center justify-center bg-gray-100 p-4 md:p-12">
      <div className="flex w-full max-w-screen-md flex-col gap-5 rounded-lg bg-white px-4 py-6 shadow-lg">
        <h1 className="text-center text-2xl font-semibold">
          Instagram Post Generator 📸
        </h1>

        <form
          action={async data => {
            try {
              const response = await fetch(
                `${window.location.href}api/generate`,
                {
                  body: data,
                  headers: {
                    contentType: "multipart/form-data",
                  },
                  method: "POST",
                },
              );

              if (response.ok) {
                const blob = await response.blob();
                const title = data.get("title") as string;
                const fileURL = URL.createObjectURL(blob);
                downloadImage(fileURL, title);
                window.location.reload();
              }
            } catch {
              //
            }
          }}
          className="flex flex-col gap-4"
          ref={formRef}>
          <ImageUpload />
          <input
            className="w-full rounded-lg px-2 py-3 shadow-md outline-none ring ring-blue-100 focus:outline-none"
            name="title"
            placeholder="the title of your post"
            required
            type="text"
          />

          <div className="flex w-full items-center gap-2">
            <input
              className="size-5 rounded"
              id="blur-checkbox"
              name="blur"
              type="checkbox"
            />
            <label
              className="flex flex-col justify-center"
              htmlFor="blur-checkbox">
              <span className="text-base font-medium">Blur background?</span>
              <span className="-mt-1 to-black/90 text-xs">
                (helpful if your image is low resolution)
              </span>
            </label>
          </div>

          <GenerateButton />
        </form>
      </div>

      <div className="absolute bottom-4 mx-auto flex w-full items-center justify-center gap-2 font-semibold">
        <span>made with</span>
        <HeartIcon className="size-5 fill-rose-300 text-red-500" />
      </div>
    </main>
  );
};
export default HomePage;
