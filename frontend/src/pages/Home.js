import React from 'react';
import bgimg from "../images/cover.jfif";
import "../index.css";
import Product from '../components/Product';
import Metadata from '../components/Metadata';

const Home = () => {
  return (
    <div>
        <Metadata title={"Flipzone - Home"}/>
        <div
            style={{
                backgroundImage: `url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh', // Full viewport height
                width: '100%',   // Full width
            }}
            className='home flex items-center justify-center'
            >
            {/* Add a semi-transparent overlay */}
            <div className='absolute inset-0 bg-black opacity-50'></div>

            {/* Content container */}
            <div className='relative text-center text-white z-10'>
                <h1 className='text-4xl font-bold mb-4 '>Welcome to FLIPZONE</h1>
                <p className='text-xl mb-4 '>FIND BEST DEALS BELOW!!</p>
                <button className='px-6 py-2 text-black border-white border-2 backdrop-blur-lg bg-white hover:bg-transparent hover:text-white font-bold rounded'>
                SCROLL
                </button>
            </div>
        </div>


        <div>
            <div className='flex flex-col items-center m-20'>
                <div className='text-3xl m-10'>Featured Products</div>
                <div className='w-80 h-[0.5px] bg-black'></div>
            </div>
            <div>
                <Product />
            </div>
        </div>
    </div>
    
  );
};

export default Home;
