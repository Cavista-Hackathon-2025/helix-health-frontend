import "./App.css";
// import AuthenticatedNav from "./components/AuthenticatedNav";
import LoginForm from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import PrescriptionScheduleForm from "./pages/prescription-scheduler/Form";
import SignupForm from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import SymptomForm from "./pages/wizard-pages/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/symptoms" element={<SymptomForm />} />
          <Route path="/schedule/new" element={<PrescriptionScheduleForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
