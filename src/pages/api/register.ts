import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hash(password, 10);

  const user: User = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(user);

  res.status(201).json({ message: "User created successfully" });
}
