const express=require("express");
const router=express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing");
const Review=require("../models/review");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware");
const reviewController=require("../controllers/reviews");


router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

//delete
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));



module.exports=router;
