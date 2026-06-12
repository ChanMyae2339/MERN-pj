const News = require("../models/News");
const mongoose = require("mongoose");

const NewController = {
  index: async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1
    const limit = parseInt(req.query.limit) || 5;
    const totalPosts = await News.countDocuments(); // Get the total number of posts
    const news = await News.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });
    const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages
    const previous = page === 1 ? false : true;
    const next = page === totalPages ? false : true;
    let paginationNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
    const data = {
      news,
      totalPosts,
      pagination: { previous, next, paginationNumbers },
    };
    return res.status(200).json(data);
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
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
      const news = await News.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      const updatedNews = await News.findById(req.params.id);
      return res
        .status(200)
        .json({ message: "News updated successfully", news: updatedNews });
    } catch (error) {
      return res.status(404).json({ message: "News not found" });
    }
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
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
      const news = await News.findByIdAndDelete(req.params.id);
      if (!news) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: "News not found" });
    }
  },
};

module.exports = NewController;
