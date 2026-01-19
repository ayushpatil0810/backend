import express from "express";
import usersRouter from "./routes/users.routes.js";
import adminRouter from "./routes/admin.routes.js";
import jwt from "jsonwebtoken";
import { authenticationMiddleware } from './middlewares/auth.middleware.js'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running" });
});

app.use("/user", usersRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
