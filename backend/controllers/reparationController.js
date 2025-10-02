const db = require("../config/db");

// ✅ Obtenir toutes les réparations
exports.getAllReparations = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute("SELECT * FROM Reparation");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Ajouter une réparation
exports.createReparation = async (req, res) => {
  try {
    const {
      id_reparation,
      description,
      cout,
      duree,
      date_reparation,
      statut,
      id_vehicule,
    } = req.body;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "INSERT INTO Reparation (id_reparation, description, cout, duree, date_reparation, statut, id_vehicule) VALUES (:id_reparation, :description, :cout, :duree, TO_DATE(:date_reparation, 'YYYY-MM-DD'), :statut, :id_vehicule)",
      {
        id_reparation,
        description,
        cout,
        duree,
        date_reparation,
        statut,
        id_vehicule,
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Réparation ajoutée avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Modifier une réparation
exports.updateReparation = async (req, res) => {
  try {
    const { description, cout, duree, statut } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Reparation SET description=:description, cout=:cout, duree=:duree, statut=:statut WHERE id_reparation=:id",
      { description, cout, duree, statut, id },
      { autoCommit: true }
    );
    res.json({ message: "Réparation mise à jour avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Supprimer une réparation
exports.deleteReparation = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "DELETE FROM Reparation WHERE id_reparation=:id",
      { id },
      { autoCommit: true }
    );
    res.json({ message: "Réparation supprimée avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Assigner une réparation à un mécanicien
exports.assignMecanicien = async (req, res) => {
  try {
    const { id_mecanicien } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Reparation SET id_mecanicien=:id_mecanicien WHERE id_reparation=:id",
      { id_mecanicien, id },
      { autoCommit: true }
    );
    res.json({ message: "Réparation assignée à un mécanicien avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mettre à jour le statut d’une réparation
exports.updateStatus = async (req, res) => {
  try {
    const { statut } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Reparation SET statut=:statut WHERE id_reparation=:id",
      { statut, id },
      { autoCommit: true }
    );
    res.json({ message: "Statut de la réparation mis à jour !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Consulter l’historique des réparations d’un véhicule
exports.getReparationsByVehicule = async (req, res) => {
  try {
    const { vehiculeId } = req.params;
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      "SELECT * FROM Reparation WHERE id_vehicule=:vehiculeId",
      { vehiculeId }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
