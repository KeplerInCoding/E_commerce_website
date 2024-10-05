const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');


// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || !req.files.avatar) {
      return next(new ErrorHandler("No file uploaded", 400));
    }
  
    const file = req.files.avatar;
  
    // Upload the file to Cloudinary
    const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "Avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id, 
        url: myCloud.secure_url,
      }
    });
  
    sendToken(user, 201, res);
  });
  

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    // Finding user in database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }
    // Get resetPassword token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    const message = `You password reset token is :- \n\n ${resetPasswordUrl} \
    \n\n If you have not requested this email then please ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: "Flipzon Reset Token",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} successfully`
        });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(err.message, 500));
        }
    });


//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne
    ({ 
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }, 
    });

    if (!user) {
        return next(new ErrorHandler("Invalid token", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    //update password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});





// Get user (my) details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    try{
        // console.log("Request Body:", req.body);
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect", 400));
        }

        // if (req.body.newPassword !== req.body.confirmPassword) {
        //     return next(new ErrorHandler("Password does not match", 400));
        // }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);

    }
    catch (error) {
        // console.error(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };
    
        if (req.files && req.files.avatar) {
            const file = req.files.avatar;
            // Upload the new avatar to Cloudinary
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "Avatars",
                width: 150,
                crop: "scale",
            });
    
            // Update new avatar info
            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
    
            // Optionally, delete the old avatar from Cloudinary
            // await cloudinary.uploader.destroy(oldUser.avatar.public_id);
        }
    
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    
        res.status(200).json({
            success: true,
            user,
        });
      } catch (error) {
        console.error('Error updating profile:', error); // Log the error
        return next(new ErrorHandler('Internal Server Error', 500));
      }
    
});


// Get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update user role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete user (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    // Remove user avatar from cloudinary - add your own cloudinary logic here

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

// Create new review or update the review

exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name: req.user.name,
        rating : Number(rating),
        comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){//update
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
                (rev.rating=rating),(rev.comment=comment);
        });
    }
    else{//new
        product.reviews.push(review);
        product.ratings = product.reviews.length
    }

    let avg = 0;
    
    product.reviews.forEach((rev)=>{
        avg += rev.rating
    });

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
});

//get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews : product.reviews,
    });
});

//delete a review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach(rev => {
        avg += rev.rating;
    });

    const ratings = reviews.length > 0 ? avg / reviews.length : 0;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        reviews,
    });
});
