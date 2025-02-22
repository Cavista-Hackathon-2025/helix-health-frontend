import { Provider } from "react-redux";
import "./App.css";
// import AuthenticatedNav from "./components/AuthenticatedNav";
import LoginForm from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import PrescriptionScheduleForm from "./pages/prescription-scheduler/Form";
import SignupForm from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import SymptomForm from "./pages/wizard-pages/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Auth from "./pages/Auth";
import DiagnosisResult from "./pages/diagnosisResult";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Auth />}>
            <Route path="/onboarding" element={<Onboarding />} />
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
