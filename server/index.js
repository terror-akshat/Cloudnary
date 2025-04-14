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
  const { resources } = await cloudinary.search
    .expression("folder:ml_default")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post("/api/upload", async (req, res) => {
  const fileStr = req.body.data;
  try {
    const uploadResponse = cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    console.log((await uploadResponse).secure_url);
    return res.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
