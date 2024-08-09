import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={searchHandler} className="w-[100vw] h-[100vh] flex justify-center items-center">
            <input
                type="text"
                placeholder="Search for products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full max-w-md p-2 border border-gray-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white font-semibold hover:bg-blue-500 transition duration-300"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
