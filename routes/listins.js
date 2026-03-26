const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../Models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Joi = require('joi');
const { isLoggedIn, isOwner } = require("../middleware.js")

const listingsController = require("../controllers/listings.js");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// INDEX
router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, upload.single('image'), wrapAsync(listingsController.createListing));

// NEW
router.route("/new")
    .get(isLoggedIn, listingsController.renderNewForm);

// SHOW
router.route("/:id")
    .get(wrapAsync(listingsController.showListing))
    .put(isLoggedIn, isOwner, upload.single('image'), wrapAsync(listingsController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

// EDIT
router.route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;