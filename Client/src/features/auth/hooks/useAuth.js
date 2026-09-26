import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../service/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      console.log("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.log("Register error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.log("Logout error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, Logout };
};
