const db = require("../config/db");

exports.getAllMecaniciens = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute("SELECT * FROM Mecanicien");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMecanicien = async (req, res) => {
  try {
    const { id_mecanicien, nom, prenom, telephone, adresse } = req.body;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "INSERT INTO Mecanicien (id_mecanicien, nom, prenom, telephone, adresse) VALUES (:id_mecanicien, :nom, :prenom, :telephone, :adresse)",
      { id_mecanicien, nom, prenom, telephone, adresse },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Mécanicien ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMecanicien = async (req, res) => {
  try {
    const { nom, prenom, telephone, adresse } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Mecanicien SET nom=:nom, prenom=:prenom, telephone=:telephone, adresse=:adresse WHERE id_mecanicien=:id",
      { nom, prenom, telephone, adresse, id },
      { autoCommit: true }
    );
    res.json({ message: "Mécanicien mis à jour avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMecanicien = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "DELETE FROM Mecanicien WHERE id_mecanicien=:id",
      { id },
      { autoCommit: true }
    );
    res.json({ message: "Mécanicien supprimé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReparationsByMecanicien = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      "SELECT * FROM Reparation WHERE id_mecanicien=:id",
      { id }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
