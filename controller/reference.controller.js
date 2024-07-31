const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../services/db").connection;
const path = require("path");
const fs = require("fs");
const siteService = require("../services/site.service");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/USER/Desktop/frontImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Get all references
router.get("/getAllReferences", async (req, res) => {
  try {
    const result = await siteService.getAll();
    res.json({ data: result });
  } catch (err) {
    console.error("Error fetching references:", err);
    res.status(500).json({ message: "Error fetching references" });
  }
});

// Add new reference
router.post("/addNewReference", async (req, res) => {
  try {
    const result = await siteService.addReference(req.body);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("Error adding reference:", err);
    res.status(500).json({ message: "Error adding reference" });
  }
});

// Add new reference with image
router.post("/addNewReferenceWithImage", upload.single("image"), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    req.body.image = image;
    if (!req.file) {
      res.status(400).send("No file uploaded");
    } else {
      const newReference = await siteService.addReferenceWithImage(req.body);
      res.status(201).json({
        message: "Successfully added reference with image",
        data: newReference
      });
    }
  } catch (err) {
    console.error("Error adding reference with image:", err);
    res.status(500).json({ message: "Failure to add reference with image" });
  }
});

// Update reference
router.put("/updateReference", upload.single("image"), async (req, res) => {
  console.log("is working ",req.body)
  try {
    const firstName = req.body.firstName;
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }

    const query = `SELECT * FROM reference WHERE name='${firstName}'`;
    const lastSite = await db(query);
    
    if (!lastSite || lastSite.length === 0) {
      console.error("Reference not found");
      return res.status(404).json({ message: "Reference not found" });
    }

    const lastImage = lastSite[0].image;

    if (!req.file) {
      req.body.image = lastImage;
    } else {
      req.body.image = req.file.filename;

      // Delete the old image
      const filePath = path.join('C:/Users/USER/Desktop/frontImages/', lastImage);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting the file: ${err}`);
          }
        });
      }
    }

    const result = await siteService.updateReference(req.body);
    res.status(200).json({
      message: "Success of update",
      data: result
    });
  } catch (err) {
    console.error("Error in update API:", err);
    res.status(500).json({
      message: "Error in update",
    });
  }
});

// Delete reference
router.delete("/deleteReference/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const referenceToDelete = await siteService.getReferenceByName(name);
    const imagePath = path.join('C:/Users/USER/Desktop/frontImages/', referenceToDelete[0].image);

    // Delete the image file
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting the file: ${err}`);
        }
      });
    }

    const result = await siteService.deleteReference(name);
    res.status(200).json({ message: "Reference deleted successfully" });
  } catch (err) {
    console.error("Error deleting reference:", err);
    res.status(500).json({ message: "Error deleting reference" });
  }
});

// Get reference by name
router.get("/getReference/:name", async (req, res) => {
  try {
    console.log(`Fetching reference by name: ${req.params.name}`);
    const result = await siteService.getReferenceByName(req.params.name);
    console.log(`Fetched reference: ${JSON.stringify(result)}`);
    res.json({ data: result });
  } catch (err) {
    console.error("Error fetching reference:", err);
    res.status(500).json({ message: "Error fetching reference" });
  }
});

module.exports = router;
