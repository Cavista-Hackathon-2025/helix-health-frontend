/* eslint-disable react/prop-types */
import { setUser } from '@/redux/userReducer'
import { Post } from '@/utils/http'
import { GoogleLogin } from '@react-oauth/google'
import { Loading, Report } from 'notiflix'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function GoogleSignUpButton({ setState, googleContext = "signin" }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLoginSuccess({ credential }) {
    Loading.standard("Signing You In...")
    const { data, err } = await Post("/api/user/google-login", { token: credential }, setState)
    if (err) {
      Loading.remove()
      return Report.failure("Error", err)
    }
    dispatch(setUser(data.user))
    localStorage.setItem("token", data.token)
    navigate("/")
    Loading.remove()
  }
  return (
    <div>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} theme='filled_black' shape='pill' context={googleContext} />
    </div>
  )
}

export default GoogleSignUpButton