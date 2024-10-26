import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register, loadUser } from '../actions/UserAction';
import { useSnackbar } from 'notistack';
import Spinner from "../components/Spinner";
import Metadata from '../components/Metadata';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import "./LoginSignup.css";
import profile from '../images/Profile.png';

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = newUser;

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
        const resultAction = await dispatch(login(loginEmail, loginPassword));

        // Check if the action was fulfilled (successful)
        if (login.fulfilled.match(resultAction)) {
            enqueueSnackbar('Login successful', { variant: 'success', autoHideDuration: 3000 });
        } 
        // Check if the action was rejected (failed)
        else if (login.rejected.match(resultAction)) {
            const errorMessage = resultAction.payload?.message || 'Login failed';
            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
        }
    } catch (error) {
        // Log the error details to the console for debugging
        console.error("Login Error:", error.response ? error.response.data : error.message);
        
        // Provide feedback using Snackbar
        enqueueSnackbar(error.response?.data?.message || 'Login failed', { variant: 'error', autoHideDuration: 3000 });
    }
};


  const registerSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    if (avatar instanceof File) {
      myForm.append("avatar", avatar);
    } else {
      console.error("Avatar is not a valid file.");
    }

    try {
      await dispatch(register(myForm));
      enqueueSnackbar('Registration successful', { variant: 'success' , autoHideDuration: 3000});
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      enqueueSnackbar(error.response?.data?.message || 'Registration failed', { variant: 'error' , autoHideDuration: 3000});
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error', autoHideDuration: 3000 });
      dispatch(clearErrors());
    }

    if (isAuthenticated && !hasAuthenticated) {
      setHasAuthenticated(true);
      dispatch(loadUser());
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect, enqueueSnackbar]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <Metadata title={"Login/Signup"} />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
