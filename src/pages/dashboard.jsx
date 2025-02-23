import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Calendar, ArrowRight, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/helix-white.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
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
    <div className="h-screen bg-[#1C1917] text-white top-0 left-0 overflow-auto fixed w-full">
      {/* Gradient Decorative Elements */}
      <div className="w-screen h-screen fixed top-0 right-0  bg-gradient-to-b from-pink-500 via-blue-500 to-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 max-h-screen " />
      <div className="w-screen h-screen max-h-screen fixed bottom-0 left-0 bg-gradient-to-t from-blue-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
              <h1 className="text-3xl font-bold">Helix</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none">
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-white font-bold bg-blue-700">
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
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Welcome back, {user.name}!
            </h2>
            <p className="text-gray-400 text-lg">
              Get instant symptom analysis and manage your prescriptions with
              advanced AI technology
            </p>
          </div>
        </div>

        {/* Main Features Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Symptom Analysis */}
          <Card className="bg-[#1E1E1E] border-gray-800 group hover:border-blue-500 transition-colors">
            <CardContent className="p-8 space-y-6">
              <div className="h-14 w-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Stethoscope size={24} />
              </div>
              <div className="space-y-2 text-white">
                <h3 className="text-2xl font-semibold">Symptom Analysis</h3>
                <p className="text-gray-400">
                  Get detailed AI-powered analysis of your symptoms and receive
                  personalized health insights
                </p>
              </div>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-500">
                <Link to="/diagnosis" className="flex items-center justify-between">
                  Symptom Analysis
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Prescription Scheduling */}
          <Card className="bg-[#1E1E1E] border-gray-800 group hover:border-pink-500 transition-colors">
            <CardContent className="p-8 space-y-6">
              <div className="h-14 w-14 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Calendar size={24} />
              </div>
              <div className="space-y-2 text-white">
                <h3 className="text-2xl font-semibold">
                  Prescription Scheduling
                </h3>
                <p className="text-gray-400">
                  Schedule and track your medications with smart reminders and
                  dosage management
                </p>
              </div>
              <Button
                asChild
                className="w-full bg-pink-600 hover:bg-pink-700 group-hover:bg-pink-500"
              >
                <Link
                  to="/schedule/new"
                  className="flex items-center justify-between"
                >
                  Manage Prescriptions
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upload Document Section */}

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Helix. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}