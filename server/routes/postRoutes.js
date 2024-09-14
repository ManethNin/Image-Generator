import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {v2 as cloudinary} from 'cloudinary'
import auth from "../middleware/auth.js"
import Post from "../mongodb/models/post.js"

dotenv.config()

const router =  express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });


router.route('/').post(auth, async (req, res) => {
  try {
    const { prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
 
    console.log("post uploaded successfully...")

    const newPost = await Post.create({
      name:req.auth.name,
      prompt,
      photo: photoUrl.url,
    });

    console.log(newPost)

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router
