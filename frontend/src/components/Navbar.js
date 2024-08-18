import React, { useState } from 'react';
import logo from '../images/Logo.png';
import { NavLink } from 'react-router-dom';
import UserOptions from './UserOptions'; // Import UserOptions
import { loadUser } from "../actions/UserAction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import Spinner from './Spinner';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <div><Spinner/></div>;
  }

  return (
    <div className='w-screen'>
      <div className='h-16 z-20 w-screen fixed flex place-content-evenly items-center backdrop-blur-lg'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <NavLink to='/'><img src={logo} alt="logo" width="200px" /></NavLink>
          </div>
        </div>
        <div className='gap-4 flex-shrink-0 hidden md:flex font-semibold'>
          <NavLink to='/' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div><div className='hover:text-blue-900'>HOME</div></div>
          </NavLink>
          <NavLink to='/products' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className='hover:text-blue-900'>PRODUCTS</div>
          </NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className='hover:text-blue-900'>CONTACT</div>
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className='hover:text-blue-900'>ABOUT</div>
          </NavLink>
        </div>
        <div className='flex md:gap-4 gap-2'>
          <NavLink to='/search' className={({ isActive }) => isActive ? "text-blue-900" : ""}>
            <div><i className="fa-solid fa-magnifying-glass hover:text-blue-900"></i></div>
          </NavLink>
          <NavLink to='/cart' className={({ isActive }) => isActive ? "text-blue-900" : ""}>
            <div><i className="fa-solid fa-cart-shopping hover:text-blue-900"></i></div>
          </NavLink>
          {!isAuthenticated &&
          <NavLink to='/login-signup' className={({ isActive }) => isActive ? "text-blue-900" : ""}>
            <div><i className="fa-solid fa-right-to-bracket hover:text-blue-900"></i></div>
          </NavLink>}
          
        </div>
        <div>{isAuthenticated && user && <UserOptions user={user} />} </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu} className="transition-transform duration-300 ease-in-out">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} transform ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
          </button>
        </div>
        <div className={`font-semibold md:hidden absolute right-0 top-[65px] py-10 w-full bg-gradient-to-b from-white to-gray-400 px-3 items-center flex flex-col gap-5 
          transition-all duration-1000 ease-in-out transform 
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <NavLink to='/' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className={`transition-opacity duration-300 transform ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-0'} delay-300 hover:font-bold`}>
              HOME
            </div>
          </NavLink>
          <NavLink to='/products' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className={`transition-opacity duration-300 transform ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-0'} delay-500 hover:font-bold`}>
              PRODUCTS
            </div>
          </NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className={`transition-opacity duration-300 transform ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-0'} delay-700 hover:font-bold`}>
              CONTACT
            </div>
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? "font-bold" : ""}>
            <div className={`transition-opacity duration-300 transform ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-30'} delay-1000 hover:font-bold`}>
              ABOUT
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
