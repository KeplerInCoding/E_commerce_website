import React, { useEffect } from 'react';
import bgimg from "../images/cover.jfif";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import { getProduct, clearErrors } from '../actions/ProductAction';
import Metadata from '../components/Metadata';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(getProduct());

        if (error) {
            enqueueSnackbar(error, { variant: 'error' , autoHideDuration: 3000 });
            dispatch(clearErrors());
        }

    }, [dispatch, error]);

    // Scroll to the featured products section
    const scrollToFeaturedProducts = () => {
        const element = document.getElementById('featured-products');
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };
    

    return (
        <div>
            <Metadata title={"Flipzone - Home"} />
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
                    <button 
                        onClick={scrollToFeaturedProducts}
                        className='px-6 py-2 text-black border-gray-200 border-2 backdrop-blur-lg bg-gray-200 hover:bg-transparent hover:text-white font-bold rounded'
                    >
                        SCROLL
                    </button>
                </div>
            </div>

            <div id="featured-products" className='container mx-auto py-16'>
                <div className='flex flex-col items-center mb-10'>
                    <div className='text-3xl font-bold mb-4'>Featured Products</div>
                    <div className='w-32 h-1 bg-black mb-8'></div>
                </div>

                {loading ? (
                    <div>
                        <Spinner/>
                    </div>
                    
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className='flex justify-center items-center flex-wrap gap-8'>
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
