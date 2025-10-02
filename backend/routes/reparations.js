const express = require("express");
const router = express.Router();
const reparationController = require("../controllers/reparationController");

router.get("/", reparationController.getAllReparations); // ✅ Obtenir toutes les réparations
router.post("/", reparationController.createReparation); // ✅ Ajouter une réparation
router.put("/:id", reparationController.updateReparation); // ✅ Modifier une réparation
router.delete("/:id", reparationController.deleteReparation); // ✅ Supprimer une réparation
router.put("/:id/assign", reparationController.assignMecanicien); // ✅ Assigner à un mécanicien
router.put("/:id/status", reparationController.updateStatus); // ✅ Mettre à jour le statut
router.get(
  "/historique/:vehiculeId",
  reparationController.getReparationsByVehicule
); // ✅ Historique des réparations

module.exports = router;
