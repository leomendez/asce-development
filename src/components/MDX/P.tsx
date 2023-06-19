import React from 'react';

export const P = ({ children }: React.PropsWithChildren) => {
  return <p className="text-slate-400">{children}</p>;
};
