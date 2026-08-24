import express from "express";
import emailRoutes from "./routes/email.queue.route.js";
const port = 3000;
const app = express();
app.use(express.json());
app.use("/api", emailRoutes);
app.listen(port, () => {
  console.log(`server is listen on ${port}`);
});
