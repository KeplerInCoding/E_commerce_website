import React from 'react';
import { Rating } from "@mui/material";

const ReviewCard = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <Rating value={review.rating} readOnly precision={0.5} />
                                <span className="ml-2 text-sm text-gray-500">{review.name}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewCard;
