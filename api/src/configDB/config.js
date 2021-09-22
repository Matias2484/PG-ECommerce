const mongoose = require("mongoose");
const { DB_CNN } = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || DB_CNN, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database connect");
  } catch (error) {
    console.log(error);
    throw new Error("error a la hora de conectar");
  }
};

if (proces.env.NODE_ENV === "production") {
  app.use(express.static("../../client/build"));
}

module.exports = {
  dbConnection,
};
