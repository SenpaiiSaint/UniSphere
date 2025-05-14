import React from "react";
import { FiGrid } from "react-icons/fi";
import Image from "next/image";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <div className="size-8 rounded shrink-0 bg-sky-400 shadow relative overflow-hidden">
          <Image
            src="https://api.dicebear.com/9.x/glass/svg?seed=Jameson"
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-start">
          <span className="text-sm font-bold block">Satoshi is Loading</span>
          <span className="text-xs block text-stone-500">satoshi@labs.dev</span>
        </div>

        <FiGrid className="absolute right-2 top-1-translate-y-[2px] text-md" />
      </button>
    </div>
  );
};
