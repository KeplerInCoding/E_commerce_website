import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, loadUser } from '../actions/UserAction';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Metadata from '../components/Metadata';
import ChangePassword from '../components/ChangePassword';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import profile from '../images/Profile.png';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // Initialize state only if user is available
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login-signup');
    } else if (!user) {
      dispatch(loadUser());
    } else {
      // Update state if user data changes
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
  }, [isAuthenticated, user, dispatch, navigate]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error', autoHideDuration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);

    if (avatar instanceof File) {
      formData.append('avatar', avatar); // Only append if avatar is a file
    }

    dispatch(updateProfile(formData));
  };

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {loading ? 
      (
        <Spinner />
      ) :
      (
        <div className='min-h-screen flex items-center gap-10 justify-center'>
            <Metadata title={`${user.name}'s Profile`} />
            <form onSubmit={updateProfileSubmit} encType="multipart/form-data">
              <div className="flex place-content-evenly gap-10  py-20 flex-wrap">
                <div>
                  <div className="mb-4">
                    <div className="flex flex-col gap-6">
                    <img
                      src={
                        avatar instanceof File 
                          ? URL.createObjectURL(avatar) 
                          : user?.avatar?.url || profile // Fallback to default avatar image
                      }
                      alt="Avatar Preview"
                      className="w-60 h-60 rounded-full mr-4 hover:shadow-lg hover:shadow-blue-900"
                    />

                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={onAvatarChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <div className='w-80'>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-900 hover:bg-blue-600 text-white font-semibold rounded-lg"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleClickOpen}
                    className="mt-4 w-full py-2 px-4 bg-red-900 hover:bg-red-600 text-white rounded-lg"
                  >
                    Update Password
                  </button>
                </div>
                
              </div>
            </form>
            
            

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>UPDATE PASSWORD</DialogTitle>
              <DialogContent>
                <ChangePassword />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      )}
    </div>
    
  );
};

export default Profile;
