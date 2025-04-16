const express = require("express");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudnary");
const app = express();

// Allow requests from your frontend origin
app.use(cors({ origin: "http://localhost:5173" }));

// Parse JSON request bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/api/image", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:Images")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    console.log(publicIds);
    res.send(publicIds);
  } catch (err) {
    console.error("Failed to fetch images:", err);
    res.status(500).json({ message: "Error fetching images from Cloudinary" });
  }
});

app.post("/api/upload", async (req, res) => {
  const fileStr = req.body.data;
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "Demo",
    });
    console.log(uploadResponse);
    return res.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
