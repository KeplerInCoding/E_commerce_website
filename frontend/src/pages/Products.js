import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { getProduct } from '../actions/ProductAction';
import ProductCard from '../components/ProductCard';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import Metadata from '../components/Metadata';
import ProductFilters from '../components/ProductFilters';

const Products = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search); 
    const keyword = searchParams.get('keyword') || ''; 
    const { products, loading, error, productsCount } = useSelector(state => state.products);
    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        dispatch(getProduct(keyword, page, priceRange, category, rating));

        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, page, priceRange, category, rating, error]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="w-full py-20 min-h-[100vh] flex flex-col items-center">
            <Metadata title={"Flipzone - products"} />
            <ProductFilters 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                category={category} 
                setCategory={setCategory} 
                rating={rating} 
                setRating={setRating} 
            />
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
                        {productsCount>9 && <Pagination
                            count={Math.ceil(productsCount / 9) || 1}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
