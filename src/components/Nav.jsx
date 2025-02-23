import helix from "@/assets/helix-purple.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-4">
        <img src={helix} alt="Helix" className="aspect-square w-10" />
        <h1 className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-4xl font-bold text-transparent">
          Helix
        </h1>
      </div>
      <div className="flex gap-10">
        <div className="">
          <Link to="/signup" className="rounded-full w-[8rem] py-2 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-600 hover:to-blue-800 transition-all font-bold duration-300 text-white">
            Sign in
          </Link>
        </div>
        <div>
          <Link to="/login" className="rounded-full border-2 border-r-blue-500 text-black font-bold hover:bg-blue-700 hover:text-white hover:border-none w-[8rem] py-2">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
