const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://user_proyecto:12345@clusterproyecto.ie6co.mongodb.net/proyectoDB";

//conexion a MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connect");
  })
  .catch((err) => {
    console.log(err);
  });

//Buscar en la BD
// Note.find({}).then((res) => {
//   console.log(res);
//   mongoose.connection.close();
// });

//Crear nueva nota en BD

// const note = new Note({
//   content: "MongoDB",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });