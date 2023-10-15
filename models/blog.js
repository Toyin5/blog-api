import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const BlogSchema = new Schema(
  {
    _id: {
      type: Schema.Types.UUID,
      default: () => randomUUID(),
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Schema.Types.UUID,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [String],
    content: {
      type: Schema.Types.Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Blogs", BlogSchema);
