import blog from "../models/blog.js";
import { generateSlug } from "../utils/helpers.js";

export const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  const id = req.user.id;
  try {
    let slug = generateSlug(title);
    const blogExist = await blog.findOne({ slug });
    if (blogExist) slug += "2";
    const newBlog = new blog({
      title,
      content,
      tags: tags,
      slug,
      author: id,
    });
    await newBlog.save();
    return res.status(201).json({
      message: "Your blog is published!",
      data: {
        slug: newBlog.slug,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getblog = async (req, res) => {
  const { slug } = req.params;
  try {
    const oneblog = await blog.findOneAndUpdate(
      { slug },
      {
        $inc: {
          views: 1,
        },
      }
    );

    if (!oneblog)
      return res.status(404).json({ message: "blog doesn't exist or deleted" });

    return res.status(200).json({
      data: {
        ...oneblog,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getBlogsByAuthor = async (req, res) => {
  const { author } = req.params;
  try {
    const blogs = await blog.find({ author });
    return res.status(200).json({ data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    await blog.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { id } = req.params;
    const oneBlog = await blog.updateOne({ _id: id }, { title, content, tags });
    return res.status(200).json({ data: oneBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
