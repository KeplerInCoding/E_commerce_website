import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Rating } from "@mui/material";

const ReviewDialog = ({ open, handleClose, rating, setRating, comment, setComment, handleSubmitReview }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
                <div className="mb-4">
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        precision={0.5}
                    />
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Comment"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitReview} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewDialog;
