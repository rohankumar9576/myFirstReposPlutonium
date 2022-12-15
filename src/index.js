const express = require("express");
const route = require('./routes/routes');
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
app.use(express.json());

mongoose.connect("mongodb+srv://rohankumar9576:rohankumar123@cluster0.xwevuug.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err))
  

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});