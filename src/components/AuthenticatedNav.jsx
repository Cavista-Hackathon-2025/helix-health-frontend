import helix from "@/assets/helix-purple.svg"

const AuthenticatedNav = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <img src={helix} alt="Helix" className="aspect-square w-10 hover:scale-110 transition-transform" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
          Helix
        </h1>
      </div>
      <div className="flex gap-10">
        <a href="" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Analyse Symptoms</a>
        <a href="" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Analyse Prescription</a>
      </div>
      <a href="" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">Profile</a>
    </nav>
  );
}

export default AuthenticatedNav