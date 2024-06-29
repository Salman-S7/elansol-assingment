import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "./src/db";
import jwt from "jsonwebtoken";
import { authenticateJwt } from "./src/middleware";

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
const MONGO = process.env.MONGODB_CONNECTION_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { userName, dob, password, email } = req.body;

    if (!userName || !dob || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //here checking if user with same name/email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      //hashing the passowrd before saving to mongo db
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        userName,
        dob,
        password: hashedPassword,
        email,
      });

      await newUser.save();

      if (!JWT_SECRET) {
        throw new Error("No jwt secret found");
      }

      const jwtToken = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ messege: "User created succesfully", jwtToken });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      throw new Error("No jwt secret found");
    }

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ messege: "Login succesfull", jwtToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", authenticateJwt, async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userId;

    const users = await User.find({ _id: { $ne: userId } }).select("-passowrd");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetching users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//test route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ messege: "Elansol" });
})

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (MONGO) mongoose.connect(MONGO);

export default app;