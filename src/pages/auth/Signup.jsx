import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import helixWhite from "@/assets/helix-white.svg"
import { Post } from "@/utils/http"
import { Link, useNavigate } from "react-router-dom"
import { Report } from "notiflix"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/userReducer"

export default function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value;
    const maxLength = value.startsWith("+") ? 15 : 11;
    if (/^\+?[0-9]*$/.test(value) && value.length <= maxLength) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, err } = await Post("/api/user/register", { name, email, phone, password }, setLoading)
    if (data) {
      localStorage.setItem("token", data.token)
      dispatch(setUser(data.user))
      navigate("/")
    } else {
      Report.failure("Error", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1C]">
      <img src={helixWhite} alt="Helix" className="aspect-square w-10"/>
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome to Helix</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              placeholder="Full Name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              required
              type="text"
              value={phone}
              onChange={handleChange}
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:bg-purple-900 text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text hover:underline">
            Login
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1C1C1C] px-2 text-gray-400">or</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full bg-[#2A2A2A] border-gray-700 text-white hover:bg-[#2A2A2A]/90 hover:text-white"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Register with Google
        </Button>
      </div>
    </div>
  )
}