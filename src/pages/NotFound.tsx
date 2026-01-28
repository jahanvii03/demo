import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-20">
      <div className="relative flex items-center justify-center gap-4">
        <div className="text-[180px] font-black text-gray-300 leading-snug select-none drop-shadow-2xl backdrop-blur-sm bg-white/10 rounded-3xl px-6 border border-white/20">
          4
        </div>
        <div className="text-[180px] font-black text-gray-100 leading-none select-none drop-shadow-2xl backdrop-blur-sm bg-white/10 rounded-3xl px-6 border border-white/20">
          0
        </div>
        <div className="text-[180px] font-black text-gray-300 leading-none select-none drop-shadow-2xl backdrop-blur-sm bg-white/10 rounded-3xl px-6 border border-white/20">
          4
        </div>
      </div>

      <h1 className="text-4xl mx-auto max-w-sm font-bold text-gray-900 mb-3 mt-0">
        Something is wrong
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        The page you are looking for was moved, removed, renamed
        <br />
        or might never existed!
      </p>
      <div className="flex items-center justify-center mt-0">
        <Link to="/">
          <Button
            variant="default"
            size="lg"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-md
           hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
    // </div>
  );
};

export default NotFound;
