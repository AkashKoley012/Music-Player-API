//! Requires mongoose
const mongoose = require("mongoose");

//!main function for error handling
main()
    .then(() => console.log("DB Connection successful"))
    .catch((err) => console.log(err.message));

//!if connection is established
async function main() {
    await mongoose.connect(process.env.DB);
}
