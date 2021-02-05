const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/shopping_online", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect to mongo");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongoDB;
