import React, { PropsWithChildren } from "react";

export const Tag = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm bg-teal-600 w-fit bg-opacity-20 py-1 px-3 rounded-full text-slate-300 font-bold">
      {children}
    </div>
  );
};
