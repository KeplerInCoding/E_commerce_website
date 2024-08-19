import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { logout } from "../actions/UserAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import profile from '../images/Profile.png';

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    enqueueSnackbar("Logout Successfully", { variant: 'success', autoHideDuration: 3000 });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleOpen = () => {
    if(!open) setOpen(true);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={()=>setOpen(!open)} >
        <img
          className="w-12 h-12 rounded-full"
          src={user.avatar.url ? user.avatar.url : profile}
          alt="Profile"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
          {options.map((item) => (
            <div
              key={item.name}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                item.func(); 
                setOpen(!open);
              }}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOptions;
