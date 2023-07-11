const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = require("../config/index");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "beepTrip",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});


export { storage, cloudinary};