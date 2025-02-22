import helix from "@/assets/helix-purple.svg";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-4">
        <img src={helix} alt="Helix" className="aspect-square w-10" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
          Helix
        </h1>
      </div>
      <div className="flex gap-10">
        <div className="">
        <button className="rounded-full w-[8rem] py-2 bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-600 hover:to-purple-800 transition-all font-bold duration-300 text-white">
  Sign in
</button>
        </div>
        <div className="w-[8rem] py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-300 hover:to-purple-500 transition-all duration-300 text-white text-center font-bold">
          <button className="rounded-full ">Log in</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
