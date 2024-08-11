import React from 'react';
import { Slider, Typography, Box } from '@mui/material';
import 'rc-slider/assets/index.css';

const categories = [
  "Laptop",
  "Tablets",
  "Wearables",
  "Accessories",
  "Cameras",
  "Home Automation",
];

const ProductFilters = ({ priceRange, setPriceRange, category, setCategory, rating, setRating }) => {
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <div className=" w-full px-2 md:p-4 flex place-content-evenly gap-5 flex-wrap shadow-lg rounded-lg">
      <Box sx={{ }}>
        <Typography variant="h8" gutterBottom className=" text-gray-700 md:w-60">
          <div className=' text-base font-extrabold text-center'>PRICE RANGE</div>
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={25000}
          sx={{
            color: '#1E40AF', // Tailwind's 'text-blue-900' equivalent
          }}
        />
      </Box>

      <Box sx={{}}>
        <Typography variant="h8" gutterBottom className=" font-extrabold text-gray-700 md:w-60 ">
        <div className=' text-base font-extrabold text-center'>CATEGORIES</div>
        </Typography>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Box>

      <Box>
        <Typography variant="h8" gutterBottom className=" font-extrabold text-gray-700 md:w-60">
        <div className=' text-base font-extrabold text-center'>RATINGS</div>
        </Typography>
        <Slider
          value={rating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.5}
          sx={{
            color: '#1E40AF', // Tailwind's 'text-blue-900' equivalent
          }}
        />
      </Box>
    </div>
  );
};

export default ProductFilters;
