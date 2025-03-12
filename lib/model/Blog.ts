import mongoose from "mongoose";


const Blog = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String , required: true },
    image: { type: String, required: true },
    author_img: { type: String, required: true }
})


const blogmodel =  mongoose.models.Blog || mongoose.model('Blog',Blog);

export default blogmodel;