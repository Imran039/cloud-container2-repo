const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const STORAGE_DIR = "/persistent_data_dir/"; // Persistent Volume Directory

// POST API to calculate the total amount of a product
app.post("/calculate", (req, res) => {
  const { file, product } = req.body;

  if (!file || !product) {
    return res.status(400).json({ file: null, error: "Invalid JSON input." });
  }

  const filePath = `${STORAGE_DIR}${file}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file, error: "File not found." });
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n");

    if (lines.length < 2) {
      return res.status(400).json({ file, error: "Input file not in CSV format." }); // Fix: Matching expected error message
    }

    let sum = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) continue; // Skip empty lines

      const parts = line.split(",");
      if (parts.length !== 2 || isNaN(parts[1])) {
        return res.status(400).json({ file, error: "Input file not in CSV format." }); // Fix: Consistent error message
      }

      const [prod, amount] = parts;
      if (prod.trim() === product) {
        sum += parseInt(amount.trim(), 10);
      }
    }

    return res.json({ file, sum });

  } catch (error) {
    return res.status(500).json({ file, error: "Error reading the file." });
  }
});

const PORT = 9090;
app.listen(PORT, () => {
  console.log(`Container 2 listening on port ${PORT}`);
});
