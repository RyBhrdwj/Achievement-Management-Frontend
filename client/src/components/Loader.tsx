import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin w-12 h-12 text-[#C7A4F5]" />
    </div>
  );
};

export default Loader;