import { Provider } from "react-redux";
import "./App.css";
// import AuthenticatedNav from "./components/AuthenticatedNav";
import LoginForm from "./pages/auth/Login";
import Onboarding from "./pages/auth/Onboarding";
import PrescriptionScheduleForm from "./pages/prescription-scheduler/Form";
import SignupForm from "./pages/auth/Signup";
import UserProfile from "./pages/UserProfile";
import SymptomForm from "./pages/wizard-pages/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Auth from "./pages/auth/Auth";
import DiagnosisResult from "./pages/diagnosis/diagnosisResult";
import Dashboard from "./pages/dashboard";
import DiagnosisHistory from "./pages/diagnosis/DiagnosisHistory";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLayoutEffect, useState } from "react";
import { Get } from "./utils/http";
import FullScreenLoader from "./components/fullScreenLoader";

function App() {
  const [loading, setLoading] = useState(false)
  const [googleClientId, setGoogleClientId] = useState(false)

  async function getGoogleDetails() {
    window.googleAvailable = false
    const { data, err } = await Get("/api/user/google", setLoading)
    if (!err && data.projectId) {
      setGoogleClientId(data.projectId)
      window.googleAvailable = true
    }
  }



  useLayoutEffect(() => {
    getGoogleDetails();
  }, [])

  if (loading) return <FullScreenLoader title="Loading Application..." />

  if (googleClientId) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <MainLogic />
      </GoogleOAuthProvider>

    );
  }

  return <MainLogic />

}

function MainLogic() {
  return <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Auth />}>
          <Route index element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/diagnosis" element={<DiagnosisHistory />} />
          <Route path="/diagnosis/new" element={<SymptomForm />} />
          <Route path="/diagnosis/:id" element={<DiagnosisResult />} />
          <Route path="/schedule/new" element={<PrescriptionScheduleForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
