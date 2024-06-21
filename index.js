const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AdminRoute=require("./Routes/AdminRoute");
const galleryRoute=require("./Routes/galleryRoute")
const LatestNewsRoute=require("./Routes/LatestNewsRoute")
const membersRoute=require("./Routes/membersRoute")
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
require("dotenv").config(); // This needs to be a function call

app.use(express.json());
app.use(cors());
app.use("/auth",AdminRoute)
app.use("/Image",galleryRoute)
app.use("/news",LatestNewsRoute)
app.use("/members",membersRoute)

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.log("Connection failed: ", error.message));
