import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import {
  ensureAuthenticated,
  restrictToRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();
const adminRestricedMiddleware = restrictToRole("ADMIN");
router.use(ensureAuthenticated);
router.use(adminRestricedMiddleware);
router.get("/users", async (req, res) => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable);
  return res.json({ users });
});

export default router;
