const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
    let queryArgs = {};
    if (req.query.q) {
        queryArgs = { title: { $regex: req.query.q, $options: 'i' } };
    }
    const listings = await Listing.find(queryArgs);
    res.render("listing/index.ejs", { listings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("listing/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body);
    if (req.file) {
        newListing.image = {
            url: "/uploads/" + req.file.filename,
            filename: req.file.filename
        };
    }
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Not Found!");
        res.redirect("/listings");
    }
    res.render("listing/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body);
    if (req.file) {
        listing.image = {
            url: "/uploads/" + req.file.filename,
            filename: req.file.filename
        };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}
