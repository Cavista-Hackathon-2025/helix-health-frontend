import AuthenticatedNav from "@/components/AuthenticatedNav";
import FullScreenLoader from "@/components/fullScreenLoader";
import { setUser } from "@/redux/userReducer";
import { Get } from "@/utils/http";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Auth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  async function getData() {
    const { data, err } = await Get("/api/user", setLoading);
    if (err) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
      dispatch(setUser(data));
      console.log(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <FullScreenLoader />;

  if (!authenticated) return <Navigate to="/login" />;
  return (
    <div className="bg-[#FAF5FF] ">
      <AuthenticatedNav />
      <Outlet />
    </div>
  );
}

export default Auth;
