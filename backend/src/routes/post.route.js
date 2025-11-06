const express = require("express");
const Post = require("../models/post.model");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const uploadFile = require("../services/storage.service");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Create Post
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const fileData = await uploadFile(req.file);
      imageUrl = fileData.url;
    }

    const post = new Post({
      userId: req.userId,
      userName: req.user.name,
      content,
      image: imageUrl,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Posts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.userId });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    post.content = req.body.content || post.content;
    post.image = req.body.image !== undefined ? req.body.image : post.image;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like Post
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Ensure likes is an array of strings for comparison
    const userIdStr = req.userId.toString();
    const likeIndex = post.likes.map((id) => id.toString()).indexOf(userIdStr);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.userId);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add Comment
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
      userId: req.userId,
      userName: req.user.name,
      text: req.body.text,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Comment
router.delete(
  "/:postId/comment/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      if (comment.userId.toString() !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      // Remove comment using Mongoose subDocument method
      comment.deleteOne();
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
