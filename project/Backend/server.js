import "dotenv/config"; // --> .env erstellen und in .gitignore hinzufügen
import express from "express";
import mongoose from "mongoose";
import cors from "cors";



const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env. || "mongodb://localhost:27017";

app.use(express.json());
app.use(cors());


mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log(`Connection with mongoDB: SUCCESS ✅`);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Connection with mongoDB: FAILED ⛔`, error);
  });
mongoose.connection.on(`error`, (error) => {
  console.error("Fehler bei der Verbindung zur Datenbank:", error);
});
