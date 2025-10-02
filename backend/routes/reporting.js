const express = require("express");
const router = express.Router();
const reportingController = require("../controllers/reportingController");

router.get("/reparations", reportingController.getReparationsByDate); // ✅ Rapport des réparations sur une période
router.get("/chiffre-affaires", reportingController.getChiffreAffaires); // ✅ Chiffre d'affaires
router.get("/top-vehicules", reportingController.getTopVehiculesRepares); // ✅ Véhicules les plus réparés

module.exports = router;
