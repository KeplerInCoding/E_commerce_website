import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../actions/UserAction'; // Import the forgotPassword action

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { loading } = useSelector((state) => state.forgotPassword);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      enqueueSnackbar('Please enter your email', { variant: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData))
      .then((response) => {
        enqueueSnackbar(response.data.message || 'Password reset email sent', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message || 'Error sending password reset email', { variant: 'error' });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleForgotPassword}>
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <div className="mb-4 relative">
          <TextField
            fullWidth
            label="Email Address"
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            InputProps={{
              startAdornment: <LockIcon className="text-gray-500" />,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-4 py-2 text-white bg-blue-900"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
