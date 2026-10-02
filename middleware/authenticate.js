import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({ error: "No token provided." });
  }

  const user = verifyToken(match[1]);

  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  req.user = user;
  return next();
}