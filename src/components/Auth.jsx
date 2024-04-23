import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../app/firebase";
import {
  registerUser,
  loginUser,
  loginUserWithGoogle,
  logoutUser,
} from "../features/authSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Hämta användarinformation från Redux store

  const handleCreateUser = async () => {
    dispatch(registerUser({ email, password }));
  };

  const handleSignIn = async () => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignInWithGoogle = () => {
    dispatch(loginUserWithGoogle());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <main>
      <h2>User Authentication</h2>
      {auth?.currentUser?.email ? (
        <p>Inloggad: {auth?.currentUser?.email}</p>
      ) : (
        <p>Inte inloggad</p>
      )}
      <input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create Account</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignInWithGoogle}>Sign in With Google</button>
      <button onClick={handleLogout}>Sign Out</button>
    </main>
  );
};

export default Auth;
