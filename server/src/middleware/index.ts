import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new Error("No jwt secret found");
      }

      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          return res.sendStatus(400);
        }
        if (!payload) {
          return res.sendStatus(400);
        }

        // this is to overcome the error on line occuring at line no. 30
        if (typeof payload === "string") {
          return res.sendStatus(400);
        }

        req.headers["userId"] = payload.id;
        next();
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
