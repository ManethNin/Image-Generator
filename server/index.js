import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import auth from "./middleware/auth.js"
import PostSchema from "./mongodb/models/post.js";

dotenv.config(); //Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)
app.use("/api/v1/userin",userRoutes)

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.delete("/api/v1",auth,async(req,res) =>{
  console.log("HIkkh")
  try {
    // console.log("HI")
    const response = await PostSchema.findByIdAndDelete(req.body.postId)
    // console.log(req.userId)
    if(response){
      console.log(response)
      res.status(200).json({ message: "Post deleted successfully", response });
      } else {
      res.status(404).json({ message: "Post not found" });
  }
}
   catch (error) {
    console.log("err",error)
    
  }
})

const startServer = async () => {

  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server is running on http://localhost:8080"))
  } catch (error) {
    console.log(error)
  }};

startServer();