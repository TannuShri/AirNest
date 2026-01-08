const express = require("express");
const router = express();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner,validateListing}=require("../middleware");
const listingController=require("../controllers/listings");
const multer  = require('multer')

const {storage}=require("../cloudConfig");

const upload = multer({ storage})


// Search route
router.get("/search", wrapAsync(listingController.index));



//new route
router.get("/new", isLoggedIn,listingController.renderNewForm);



//index and show routes
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  validateListing,
   upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);


 
//edit
router.get("/:id/edit",
   isLoggedIn,
   isOwner,
   wrapAsync( listingController.editListings)
  );
//update


router
.route("/:id")
.get(
  wrapAsync(listingController.showListings)
)
.put(
  isLoggedIn,
  isOwner,
   upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListings)
)
.delete(
   isLoggedIn,
   isOwner,
   wrapAsync(listingController.deleteListings)
  )


 router.get("/category/:category", wrapAsync(listingController.categoryListings));



 //booking
 router.post("/:id/book", isLoggedIn, wrapAsync(listingController.bookListing));

module.exports = router;
