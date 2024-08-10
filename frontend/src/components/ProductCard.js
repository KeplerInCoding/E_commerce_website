import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    // Function to truncate description to 15 words
    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
    };

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <div className='border border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 w-64 h-[450px]'>
                {product.images && product.images.length > 0 && (
                    <img src={product.images[0].url} alt={product.name} className='w-64 h-64 object-cover' />
                )}
                <div className='p-4'>
                    <h2 className='text-lg font-bold mb-2'>{product.name}</h2>
                    <p className='text-gray-700 text-sm mb-2'>{truncateDescription(product.description, 5)}</p>
                    <Rating {...options} />{" "}
                    <span className="productCardSpan">
                        {" "}({product.numOfReviews})
                    </span>
                    <p className='text-xl font-semibold'>{`₹${product.price}`}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
