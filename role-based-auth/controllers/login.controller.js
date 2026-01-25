import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { randomBytes, createHmac, sign } from "crypto";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const { name, email, password } = req.body;

  //checking if the user exists in the db
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      role: usersTable.role,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  // if user dosent exists
  if (!existingUser) {
    return res
      .status(404)
      .json({ error: `user with email ${email} does not exists!` });
  }

  // if the user exists
  // get the salt from the existing user data
  const salt = existingUser.salt;
  // het the hash from the existing user data
  const existingHash = existingUser.password;

  // creating a new hash, with tha same salt and password given my user
  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  // checking if the hash from the existing user is not equal to the new hash
  if (newHash != existingHash) {
    return res.status(400).json({ error: `Incorrect password` });
  }

  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({ status: "success", token: token });
}

export default login;
