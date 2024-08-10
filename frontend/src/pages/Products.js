import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../actions/ProductAction';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Metadata from '../components/Metadata';


const Products = () => {
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search); // Access the query string
    const keyword = searchParams.get('keyword'); // Get the `keyword` query parameter
    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
      dispatch(getProduct(keyword || "")); 
    }, [dispatch, keyword]);

    return (
        <div className="container mx-auto py-8 pt-20 min-h-[100vh]">
          <Metadata title={"Flipzone - search"} />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="flex justify-center items-center flex-wrap gap-8 pt-10">
                        {products.length ? (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="w-full h-[100vh] flex justify-center items-center text-2xl font-bold col-span-3 text-gray-700">No products found</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;


