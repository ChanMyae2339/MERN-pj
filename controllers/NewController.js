const News = require("../models/News");
const mongoose = require("mongoose");
const NewController = {
  index: async (req, res) => {
    const news = await News.find(); //fetch all news from database
    return res.status(200).json(news);
  },
  store: async (req, res) => {
    const { title, description, author, type } = req.body;
  
    const news = await News.create({
      title,
      description,
      author,
      type,
    });
    return res.status(201).json(news); //response json data to client
  },
  update: async (req, res) => {
    const { title, description, author, type } = req.body;
   
    const news = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        author,
        type,
      },
     
    );
    return res.status(200).json(news);
  },
  show: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
    const news = await News.findById(req.params.id);
    if (!news) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    return res.status(200).json(news);
    } catch (error) {
      return res.status(404).json({ message: "News not found" });
    }
  },
  delete: async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: "News not found" });
    }
  },
};

module.exports = NewController;
