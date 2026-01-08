const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   const allListing = await Listing.find({});

//   res.render("index", { allListing });
// };
module.exports.index = async (req, res) => {
  const { category, location } = req.query; // get query params

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (location) {
    // case-insensitive match for either location or country
    filter.$or = [
      { location: { $regex: location, $options: "i" } },
      { country: { $regex: location, $options: "i" } }
    ];
  }

  const allListing = await Listing.find(filter);
  res.render("index", { allListing, location }); // pass location to preserve filter in links
};


module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Lisitng you requested for doesn't exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Lisitng you requested for doesn't exist");
    return res.redirect("/listings");
  }
  let originalImage=listing.image.url;
  originalImageUrl=originalImage.replace("/upload","/upload/h_200,w_200");
  res.render("edit.ejs", { listing,originalImageUrl});
};

module.exports.updateListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file!=="undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};


module.exports.categoryListings = async (req, res) => {
  const { category } = req.params;
  const allListing = await Listing.find({ category });

  if (!allListing.length) {
    req.flash("error", `No listings found for ${category}`);
    return res.redirect("/listings");
  }

  res.render("category", { allListing, category });
};


// 🔍 Search by location or country
module.exports.index = async (req, res) => {
  let { location, category } = req.query; // get query params

  let filter = {};

  if (location) {
    // Search in either location OR country (case-insensitive)
    filter.$or = [
      { location: { $regex: location, $options: "i" } },
      { country: { $regex: location, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  const allListing = await Listing.find(filter);

  res.render("index", { allListing, location, category });
};



module.exports.bookListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Prevent owner from booking own listing
  if (listing.owner.equals(req.user._id)) {
    req.flash("error", "You cannot book your own listing!");
    return res.redirect(`/listings/${id}`);
  }

  // TODO: Add booking logic to DB if needed (e.g., Booking model)
  // For now, just flash success
  req.flash("success", `Successfully booked "${listing.title}" in ${listing.location} for ₹${listing.price.toLocaleString('en-IN')}!`);
  res.redirect(`/listings/${id}`);
};
