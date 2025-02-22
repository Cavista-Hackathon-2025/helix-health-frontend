import "./App.css";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import SymptomForm from "./pages/wizard-pages/page";

function App() {
  return (
    <>
      <LoginForm />
      <SymptomForm />
      <SignupForm />
    </>
  );
}

export default App;
