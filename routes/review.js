const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../Models/review.js");
const Listing = require("../Models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Joi = require('joi');
const { isLoggedIn, isOwner } = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

router.route("/")
    .post(isLoggedIn, wrapAsync(reviewsController.addReview));

router.route("/:reviewId")
    .delete(isLoggedIn, isOwner, wrapAsync(reviewsController.deleteReview));

module.exports = router;
