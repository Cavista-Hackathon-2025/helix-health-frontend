import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import helixWhite from "@/assets/helix-white.svg"

export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1C]">
      <img src={helixWhite} alt="Helix" className="aspect-square w-10"/>
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Email address"
              required
              type="email"
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Password"
              required
              type="password"
              className="bg-[#2A2A2A] border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:bg-purple-900 text-white">Login</Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <a href="/signup" className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:underline">
            Sign up
          </a>
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
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}



