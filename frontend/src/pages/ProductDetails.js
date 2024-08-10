import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'; 
import { useSelector, useDispatch } from "react-redux";
import Metadata from '../components/Metadata';
import { clearErrors, getProductDetails, newReview } from "../actions/ProductAction";
import Spinner from '../components/Spinner';
import { Rating } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { addToCart } from '../actions/CartAction';
import ReviewCard from '../components/ReviewCard';
import ReviewDialog from '../components/ReviewDialog';
import "../index.css"

const ProductDetails = () => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { id } = useParams(); // Destructure id from useParams
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector(state => state.newReview);

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }

        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: 'error' });
            dispatch(clearErrors());
        }

        if (success) {
            enqueueSnackbar("Review submitted successfully", { variant: 'success' });
            setReviewSubmitted(true);
            setOpen(false);
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, id, error, reviewError, success, enqueueSnackbar]);

    const handleSubmitReview = () => {
        const reviewData = { rating, comment, productId: id };
        dispatch(newReview(reviewData));
    };


    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, quantity));
        enqueueSnackbar("Added to cart", { variant: 'success' });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading) return <Spinner />;
    
    return (
        <div className='pt-12'>
            <Metadata title={`${product.name} - Product Details`} />
            <div className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row">


                    <div className="w-full md:w-1/2">
                        <Carousel showArrows={true} showThumbs={true} showIndicators={true} dynamicHeight={true}>
                            {product.images && product.images.map((image, i) => (
                                <div key={i}>
                                    <img src={image.url} alt={`${product.name} - ${i}`} className="w-full h-[400px] object-cover" />
                                </div>
                            ))}
                        </Carousel>
                    </div>


                    <div className="w-full md:w-1/2 md:pl-20 px-10 md:px-0">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className='text-sm text-gray-600 mb-2'>ID: {product._id}</p>
                        <div className='w-full h-[0.5px] bg-white'></div>
                        <p className=" my-4">{product.description}</p>

                        {/* rating  */}

                        <div className="flex items-center mb-8">
                            <Rating value={product.ratings} readOnly precision={0.5} />
                            <span className="ml-2">({product.numOfReviews} Reviews)</span>
                        </div>
                        <div className='w-full h-[0.5px] bg-white'></div>

                        <div className='flex justify-center items-center gap-10'>
                            <p className="text-xl font-semibold ">₹{product.price}</p>
                            <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="quantity-container flex items-center justify-center my-4">
                            <button onClick={decreaseQuantity} className="quantity-btn px-3 py-1 bg-white border-1 font-extrabold text-xl text-gray-800 rounded">-</button>
                            <span className="quantity-display mx-4 text-lg">{quantity}</span>
                            <button onClick={increaseQuantity} className="quantity-btn px-3 py-1 bg-white border-1 font-extrabold text-xl text-gray-800 rounded">+</button>
                        </div>

                        <div className='flex justify-center items-center my-5 gap-3'>

                            {/* Add to Cart Button */}
                            <button
                                onClick={addToCartHandler}
                                className={`px-6 py-2 text-white rounded-md ${product.stock > 0 ? 'bg-blue-900 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={product.stock === 0}
                            >
                                Add to Cart
                            </button>
                            <br/>

                            {/* review products  */}

                            <button
                                className="px-6 py-2 text-white bg-blue-900 hover:bg-blue-600 rounded-md"
                                onClick={handleOpen}
                            >
                                Submit Review
                            </button>

                        </div>
                        
                        <div className='w-full h-[0.5px] bg-white'></div>

                        
                    </div>
                    
                </div>
                <ReviewCard reviews={product.reviews} />

                <ReviewDialog
                    open={open}
                    handleClose={handleClose}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    handleSubmitReview={handleSubmitReview}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
