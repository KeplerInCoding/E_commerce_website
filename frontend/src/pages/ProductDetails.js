import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'; 
import { useSelector, useDispatch } from "react-redux";
import Metadata from '../components/Metadata';
import { clearErrors, getProductDetails } from "../actions/ProductAction";
import Spinner from '../components/Spinner';
import { Rating } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { useSnackbar } from 'notistack';

const ProductDetails = ({ match }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector(state => state.newReview);

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));

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
    }, [dispatch, match.params.id, error, reviewError, success, enqueueSnackbar]);

    const handleSubmitReview = () => {
        const reviewData = { rating, comment, productId: match.params.id };
        dispatch(newReview(reviewData));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading) return <Spinner />;
    
    return (
        <div>
            <Metadata title={`${product.name} - Product Details`} />
            <div className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <Carousel>
                            {product.images && product.images.map((image, i) => (
                                <img key={i} src={image.url} alt={`${product.name} - ${i}`} className="w-full h-[400px] object-cover" />
                            ))}
                        </Carousel>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-lg mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <Rating value={product.ratings} readOnly precision={0.5} />
                            <span className="ml-2">({product.numOfReviews} Reviews)</span>
                        </div>
                        <p className="text-xl font-semibold mb-4">₹{product.price}</p>
                        <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <button
                            className={`mt-4 px-6 py-2 text-white ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={product.stock === 0}
                            onClick={handleOpen}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent>
                        <div className="mb-4">
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(e, newValue) => setRating(newValue)}
                                precision={0.5}
                            />
                        </div>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitReview} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ProductDetails;
