import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Metadata from '../components/Metadata';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products?keyword=${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className='px-3'>
            <Metadata title={"Flipzone - search"} />
            <form onSubmit={searchHandler} className=" h-[100vh] flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 font-mono focus:outline-none"
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-500 transition duration-300"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;
