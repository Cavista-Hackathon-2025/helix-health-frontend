import helix from "@/assets/helix-purple.svg"
import { Brain, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSubTrigger, MenubarTrigger } from "./ui/menubar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";

const AuthenticatedNav = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
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
      <Menubar className="border-none rounded-full">
        <MenubarMenu className="border-none">
          <MenubarTrigger className=" rounded-full aspect-square active:bg-purple-600 w-10 bg-purple-600">
            <Avatar>
              <AvatarFallback className="text-white font-bold bg-transparent">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to="/login">Login</Link>
            </MenubarItem>
            <MenubarItem>
              <Link to="/logout">Logout</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}

export default AuthenticatedNav