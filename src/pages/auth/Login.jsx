import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import helixWhite from "@/assets/helix-white.svg"
import { useState } from "react"
import { Post } from "@/utils/http"
import { Link, useNavigate } from "react-router-dom"
import { Report } from "notiflix"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/userReducer"
import GoogleSignUpButton from "@/components/googleSignUpButton"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, err } = await Post("/api/user/login", { email, password }, setLoading)
    if (data) {
      console.log(data.token)
      localStorage.setItem("token", data.token)
      dispatch(setUser(data.user))
      navigate("/")
    } else {
      Report.failure("Error", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1C]">
      <img src={helixWhite} alt="Helix" className="aspect-square w-10" />
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-400">Don&apos;t have an account? </span>
          <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:underline">
            Sign up
          </Link>
        </div>
        {window.googleAvailable && <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1C1C1C] px-2 text-gray-400">or</span>
            </div>
          </div>
          <GoogleSignUpButton setState={setLoading} />
        </>}


      </div>
    </div>
  )
}