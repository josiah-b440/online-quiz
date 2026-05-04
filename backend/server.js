const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ FIX CORS
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ FIX FILE PATH
const FILE = path.join(__dirname, "questions.json");

// READ
app.get("/questions", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// CREATE
app.post("/questions", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Question Added");
});

// UPDATE
app.put("/questions/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data[req.params.id] = req.body;
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Updated");
});

// DELETE
app.delete("/questions/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data.splice(req.params.id, 1);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Deleted");
});

// ✅ FIX PORT (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));