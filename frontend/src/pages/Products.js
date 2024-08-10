import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getProduct } from '../actions/ProductAction';
import ProductCard from '../components/ProductCard';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import Metadata from '../components/Metadata';

const Products = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search); // Access the query string
    const keyword = searchParams.get('keyword') || ''; // Get the `keyword` query parameter
    const { products, loading, error, productsCount } = useSelector(state => state.products);
    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getProduct(keyword, page)); 

        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, page, error]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="w-screen py-20 min-h-[100vh] flex flex-col justify-center items-center">
            <Metadata title={"Flipzone - products"} />
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
                            <div className="w-full h-[100vh] flex flex-col justify-center items-center text-2xl font-bold text-gray-700">
                                No products found
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Pagination
                            count={Math.ceil(productsCount / 9)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
