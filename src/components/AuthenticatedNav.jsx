import helix from "@/assets/helix-purple.svg"
import { Brain, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const AuthenticatedNav = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link className="flex items-center gap-4" to="/">
        <img src={helix} alt="Helix" className="aspect-square w-10 hover:scale-110 transition-transform" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
          Helix
        </h1>
      </Link>
      <div className="flex gap-10">
        <Link to="/diagnosis" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"><Brain /> Symptom Analysis</Link>
        <Link to="/schedule/new" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"><Calendar /> Prescription Scheduling</Link>
      </div>
      <a href="" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">Profile</a>
    </nav>
  );
}

export default AuthenticatedNav