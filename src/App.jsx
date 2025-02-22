import "./App.css";
// import AuthenticatedNav from "./components/AuthenticatedNav";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import SymptomForm from "./pages/wizard-pages/page";

function App() {
  return (
    <>
      <LoginForm />
      <SymptomForm />
      {/* <AuthenticatedNav /> */}
      <SignupForm />
    </>
  );
}

export default App;
