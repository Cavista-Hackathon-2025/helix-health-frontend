import helix from "@/assets/helix-purple.svg"
import { Brain, Calendar, Menu, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AuthenticatedNav = () => {
  const user = useSelector((state) => state.user.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getInitials = (name) => {
    return (
      name &&
      name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    );
  };

  return (
    <nav className="flex lg:justify-between gap-4 items-center p-4">
      <Link className="flex items-center gap-4" to="/">
        <img src={helix} alt="Helix" className="aspect-square w-10 hover:scale-110 transition-transform" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
          Helix
        </h1>
      </Link>
      <div className="flex-1 block lg:hidden"></div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-10">
        <Link to="/diagnosis" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"><Brain /> Symptom Analysis</Link>
        <Link to="/schedule/new" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"><Calendar /> Prescription Scheduling</Link>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden text-gray-700 hover:text-purple-600">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-10 h-10" >
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="text-white font-bold bg-purple-600">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>
            <Link
              to="/diagnosis"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Brain /> Symptom Analysis
            </Link>
            <Link
              to="/schedule/new"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex flex-row items-center gap-1"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Calendar /> Prescription Scheduling
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus:outline-none">
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback className="text-white font-bold bg-purple-600">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer">
            <Link to="/profile" className="flex items-center gap-2 w-full">
              <User size={16} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-600">
            <Link to="/login" className="flex items-center gap-2 w-full" onClick={() => {
              localStorage.removeItem("token");
            }}>
              <LogOut size={16} />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default AuthenticatedNav