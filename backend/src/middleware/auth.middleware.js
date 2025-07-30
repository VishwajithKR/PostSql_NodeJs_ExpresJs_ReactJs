import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function protectRoute(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Error in protectRoute:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
