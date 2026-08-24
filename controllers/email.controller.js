import emailQueue from "../queue/email.queue.js";

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
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

export default sendEmail;
