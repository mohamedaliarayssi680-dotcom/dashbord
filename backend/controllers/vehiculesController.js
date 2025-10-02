const db = require("../config/db");

// ✅ Obtenir tous les véhicules
exports.getAllVehicules = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute("SELECT * FROM Vehicule");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Ajouter un véhicule
exports.createVehicule = async (req, res) => {
  try {
    const { id_vehicule, marque, modele, immatriculation, annee, id_client } =
      req.body;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "INSERT INTO Vehicule (id_vehicule, marque, modele, immatriculation, annee, id_client) VALUES (:id_vehicule, :marque, :modele, :immatriculation, :annee, :id_client)",
      { id_vehicule, marque, modele, immatriculation, annee, id_client },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Véhicule ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Modifier un véhicule
exports.updateVehicule = async (req, res) => {
  try {
    const { marque, modele, immatriculation, annee, id_client } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Vehicule SET marque=:marque, modele=:modele, immatriculation=:immatriculation, annee=:annee, id_client=:id_client WHERE id_vehicule=:id",
      { marque, modele, immatriculation, annee, id_client, id },
      { autoCommit: true }
    );
    res.json({ message: "Véhicule mis à jour avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Supprimer un véhicule
exports.deleteVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "DELETE FROM Vehicule WHERE id_vehicule=:id",
      { id },
      { autoCommit: true }
    );
    res.json({ message: "Véhicule supprimé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.assignClient = async (req, res) => {
  try {
    const { id_client } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Vehicule SET id_client=:id_client WHERE id_vehicule=:id",
      { id_client, id },
      { autoCommit: true }
    );
    res.json({ message: "Véhicule assigné à un client avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
