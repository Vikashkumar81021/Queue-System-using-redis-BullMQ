import emailQueue, { videoQueue } from "../queue/email.queue.js";

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    //   emailQueue.add() → job produce/add karta hai
    //PRODUCER Jahan se tum queue mein job/message add/send karte ho, woh Producer ka role hai.
    const job = await emailQueue.add(
      "send-email",
      {
        email,
      },
      {
        attempts: 3,
      },
    );
    res.status(200).json({
      message: "Email job added to queue",
      jobId: job.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const uploadVideo = async (req, res) => {
  try {
    const { video } = req.body;
    const job = await videoQueue.add(
      "video-upload",
      {
        video,
      },
      {
        attempts: 3,
      },
    );
    res.status(200).json({
      message: "Upload video sucessfully",
      jobId: job.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default sendEmail;
