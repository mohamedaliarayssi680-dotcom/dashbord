const express = require("express");
const router = express.Router();
const vehiculesController = require("../controllers/vehiculesController");

// ✅ Vérifie que toutes les routes appellent la bonne fonction
router.get("/", vehiculesController.getAllVehicules);
router.post("/", vehiculesController.createVehicule);
router.put("/:id", vehiculesController.updateVehicule);
router.delete("/:id", vehiculesController.deleteVehicule);
router.put("/:id/assign-client", vehiculesController.assignClient);
module.exports = router;
