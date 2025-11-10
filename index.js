import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const USERS = [];

(async () => {
  const passwordHash = await bcrypt.hash("Rangwala", 10);
  USERS.push({ userId: "Admin", passwordHash });
})();

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = USERS.find((u) => u.userId === userId);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Auth API running on http://localhost:${PORT}`)
);
