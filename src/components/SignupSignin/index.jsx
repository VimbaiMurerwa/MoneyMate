import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../../components/Common/Input/Input";
import Button from "../../components/Common/Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const signUnHandle = () => {
    if (
      name !== " " &&
      email !== " " &&
      password !== " " &&
      cfPassword !== " "
    ) {
      setLoading(true);
      if (password !== cfPassword) {
        toast.error("Password does not match");
        setLoading(false);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Sign in successfully");
          setLoading(false);
          setLoginForm(true);
          setName("");
          setEmail("");
          setPassword("");
          setcfPassword("");

          createDoc(user);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields required");
      setLoading(false);
    }
  };

  const signInHandle = () => {
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Login successfully");
          setEmail("");
          setPassword("");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields required");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName ? user.displayName : user.email,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on{" "}
            <span style={{ color: "var(--primary-purple)" }}>MoneyMate</span>
          </h2>
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
            id="email"
            name="email"
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
            id="password"
            name="password"
          />
          <Button
            text={loading ? "Loading..." : "Login"}
            disabled={loading}
            onClick={signInHandle}
            purple={true}
          />
          <p className="have-an-account">
            Don't have an account?{" "}
            <span
              onClick={() => setLoginForm(false)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on{" "}
            <span style={{ color: "var(--primary-purple)" }}>MoneyMate</span>
          </h2>
          <InputComponent
            type={"text"}
            state={name}
            setState={setName}
            placeholder={"Enter your name"}
            id="name"
            name="name"
          />
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
            id="email"
            name="email"
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
            id="password"
            name="password"
          />
          <InputComponent
            type={"password"}
            state={cfPassword}
            setState={setcfPassword}
            placeholder={"Confirm password"}
            id="cfPassword"
            name="cfPassword"
          />
          <Button
            text={loading ? "Loading..." : "Sign up"}
            disabled={loading}
            onClick={signUnHandle}
            purple={true}
          />
          <p className="have-an-account">
            Already have an account?{" "}
            <span
              onClick={() => setLoginForm(true)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default SignupSignin;

