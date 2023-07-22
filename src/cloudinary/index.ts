const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import env from "../config/index";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "beepTrip",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});


export { storage, cloudinary};