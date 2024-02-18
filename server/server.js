const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const imageGalleryRoute = require("./routes/imageGallery");
app.use("/api/imagegallery", imageGalleryRoute);
const PORT = 5000;
app.listen(PORT, () => console.log(`you server is runnning at ${PORT}`));
