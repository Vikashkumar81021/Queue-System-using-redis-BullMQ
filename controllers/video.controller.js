import video from "../models/video.model.js";
import { videoQueue } from "../queue/video.queue.js";

const uploadVidoController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Missing fields are required" });
    }
    const Video = await video.create({
      title,
      videoUrl: req.file.path,
      status: "processing",
    });
    const job = await videoQueue.add("video-processing", {
      videoId: Video._id,
    });
    return res.status(200).json({
      message: job.id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default uploadVidoController;
