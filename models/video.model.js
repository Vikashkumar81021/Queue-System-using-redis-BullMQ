import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ["processing", "completed", "failed"],
    default: "processing",
  },
});

const video = mongoose.model("Video", videoSchema);
export default video;
