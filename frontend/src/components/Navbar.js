import React, { useState } from 'react';
import logo from '../images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-screen heading'>
      <div className='h-16 z-20 w-screen fixed flex place-content-evenly items-center'>
        <div className='flex items-center'>
          <div className=' flex-shrink-0'><img src={logo} alt="logo" width="300px" /></div>
        </div>
        <div className='gap-4 text-2xl text-gray-200 flex-shrink-0 hidden md:flex'>
        <a href="https://www.linkedin.com/in/shreya-sharma-104278198/"><i className="fab fa-linkedin hover:text-pink-900"></i></a>
          <a href="https://www.instagram.com/shr.yey/"><i className="fab fa-instagram hover:text-pink-900"></i></a>
          <a href="https://twitter.com/Shreya___20"><i className="fab fa-twitter hover:text-pink-900"></i></a>
          <a href="https://github.com/KeplerInCoding"><i className="fab fa-github hover:text-pink-900"></i></a>
          <a href="https://open.spotify.com/user/au3j9dyoyj8pdrn04aul2u1t3"><i className="fab fa-spotify hover:text-pink-900"></i></a>
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-white'>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        <div className={`font-semibold md:hidden absolute text-2xl place-content-end right-0 top-[65px] p-5 bg-slate-800/70 text-white px-3 items-center flex gap-5 ${isMenuOpen ? 'flex flex-col' : 'hidden'}`}>
          <a href="https://www.linkedin.com/in/shreya-sharma-104278198/"><i className="hover:text-pink-900 fab fa-linkedin"></i></a>
          <a href="https://www.instagram.com/shr.yey/"><i className="hover:text-pink-900 fab fa-instagram"></i></a>
          <a href="https://twitter.com/Shreya___20"><i className="hover:text-pink-900 fab fa-twitter"></i></a>
          <a href="https://github.com/KeplerInCoding"><i className="hover:text-pink-900 fab fa-github"></i></a>
          <a href="https://open.spotify.com/user/au3j9dyoyj8pdrn04aul2u1t3"><i className="hover:text-pink-900 fab fa-spotify"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;