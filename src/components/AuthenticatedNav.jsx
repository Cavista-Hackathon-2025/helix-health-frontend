import helix from "@/assets/helix-purple.svg"

const AuthenticatedNav = () => {
  return (
      <nav className="flex justify-between items-center">
        <div className="flex gap-4">
          <img src={helix} alt="Helix" className="aspect-square w-10" />
          <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
            Helix
          </h1>
        </div>
        <div className="flex gap-10">
          <a href="">Analyse Symptoms</a>
          <a href="">Analyse Prescription</a>
        </div>
          <a href="">Profile</a>
      </nav>
    );
}

export default AuthenticatedNav
