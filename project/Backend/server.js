import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/userSchema.js"; 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI || "mongodb://localhost:27017";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed", error);
  });

// Benutzeranmeldung 
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Falsches Passwort" });
    }

    // Erstellen des JWT-Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Erfolgreich angemeldet", token });
  } catch (error) {
    console.error("Fehler bei der Benutzeranmeldung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Beispielgeschützte Route
app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "Geschützte Route" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Nicht authentifiziert" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Ungültiger Token" });
    req.user = user;
    next();
  });
}
