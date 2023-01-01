const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router)

app.use('/',(req, res)=>{
  res.send("hello world!");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await dbConnect();
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.log("Unable to connect to database");
  }
});
