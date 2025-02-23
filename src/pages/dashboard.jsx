import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/helix-white.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

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
      <div className="w-screen h-full fixed top-0 right-0  bg-gradient-to-b from-pink-500 via-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 max-h-screen " />
      <div className="w-screen h-full max-h-screen fixed bottom-0 left-0 bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

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
            <div className="h-10 w-10 rounded-full flex items-center justify-center">
              <Avatar>
                <AvatarFallback className="text-white font-bold bg-purple-700">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
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
          <Card className="bg-[#1E1E1E] border-gray-800 group hover:border-purple-500 transition-colors">
            <CardContent className="p-8 space-y-6">
              <div className="h-14 w-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Stethoscope size={24} />
              </div>
              <div className="space-y-2 text-white">
                <h3 className="text-2xl font-semibold">Symptom Analysis</h3>
                <p className="text-gray-400">
                  Get detailed AI-powered analysis of your symptoms and receive
                  personalized health insights
                </p>
              </div>
              <Button
                asChild
                className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-500"
              >
                <Link
                  to="/diagnosis/new"
                  className="flex items-center justify-between"
                >
                  Analyze Symptoms
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
