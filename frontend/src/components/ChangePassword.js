import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../actions/UserAction'; // Update with your action creator
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("new pass:", newPassword, "old pass:", oldPassword);

    if (newPassword !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }

    try {
      await dispatch(updatePassword({ oldPassword, newPassword }));
      enqueueSnackbar('Password updated successfully', { variant: 'success' , autoHideDuration: 3000});
    } catch (error) {
        console.error("Error response:", error.response.data);
      enqueueSnackbar(error.response?.data?.message || 'Error updating password', { variant: 'error' , autoHideDuration: 3000});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-80 ">
        <div className='flex gap-2 text-gray-700'>
        <VpnKeyIcon />
        <label htmlFor="newPassword" className="block text-gray-700 text-sm">Current Password</label>
        </div>
        <input
          type="password"
          id="oldPassword"
          className="w-full px-3 py-2 focus:outline-none border border-gray-500"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <div className='flex gap-2 text-gray-700'>
        <LockOpenIcon />
        <label htmlFor="newPassword" className="block text-gray-700 text-sm">New Password</label>
        </div>
        <input
          type="password"
          id="newPassword"
          className="w-full px-3 py-2 focus:outline-none border border-gray-500 "
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <div className='flex gap-2 text-gray-700'>
        <LockIcon />
        <label htmlFor="newPassword" className="block text-gray-700 text-sm">Confirm New Password</label>
        </div>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 focus:outline-none border border-gray-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-900 hover:bg-blue-600 w-full text-white rounded-lg"
      >
        DONE
      </button>
    </form>
  );
};

export default ChangePassword;
