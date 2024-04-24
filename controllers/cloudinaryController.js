const express = require("express"); // Utilisation de const pour déclarer express

const cloudinary = require('cloudinary').v2;
const app = express();
const fileUpload = require('express-fileupload');

// Configuration de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ROUTE upload fichier/img
exports.uploadFile = async (req, res) => {
    if (req.files && req.files.image) {
        try {
            // Utilisation de la promesse avec async/await
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            res.json({ imageUrl: result.url });
        } catch (error) {
            console.log('error upload controller : ', error);
            res.status(500).json({ result: false, error: error.message });
        }
    } else {
        res.status(400).json({ result: false, error: "No file uploaded" });
    }
};