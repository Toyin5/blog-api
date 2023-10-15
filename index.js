import express from "express";
import database from "./utils/db.js";
import "dotenv/config";
import cors from "cors";
import { userRoute } from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static("/public"));
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoutes);

await database();

app.use("/", (_, res) => {
  res.status(200).json({
    code: 200,
    message: "Welcome to the blog api",
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export default app;
