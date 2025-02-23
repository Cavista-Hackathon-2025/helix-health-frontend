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

function App() {
  return (
    <Provider store={store}>
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
  );
}

export default App;
