const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

main()
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const User = require("../Models/user.js");

const initDB = async () => {
    await Listing.deleteMany({});
    
    let defaultUser = await User.findOne({ username: "demouser" });
    if (!defaultUser) {
        defaultUser = new User({ email: "demo@example.com", username: "demouser" });
        await User.register(defaultUser, "demopassword");
    }

    const updatedData = initData.map((listing) => ({
        ...listing,
        owner: defaultUser._id,
        image: { url: listing.image, filename: "default" }
    }));
    await Listing.insertMany(updatedData);
    console.log("Data initialized with default user attached");
}

initDB();
