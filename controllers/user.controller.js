import { welcomeMail } from "../queue/welcome.email";

let users = [];
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }

    users.push({
      userName,
      email,
      password,
    });
    console.log("user", users);
    const job = await welcomeMail.add(
      "send-welcome-email",
      {
        email,
      },
      {
        attempts: 3,
      },
    );
    res.status(200).json({
      message: "register successfully",
      jobId: job.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
