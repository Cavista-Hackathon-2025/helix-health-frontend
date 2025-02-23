/* eslint-disable react/prop-types */

import { Loader2 } from "lucide-react";

const FullScreenLoader = ({ title = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="text-sm text-white">{title}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
