const express = require("express");
const router = express.Router();
const mecanicienController = require("../controllers/mecanicienController");

router.get("/", mecanicienController.getAllMecaniciens);
router.post("/", mecanicienController.createMecanicien);
router.put("/:id", mecanicienController.updateMecanicien);
router.delete("/:id", mecanicienController.deleteMecanicien);
router.get("/:id/reparations", mecanicienController.getReparationsByMecanicien);

module.exports = router;
