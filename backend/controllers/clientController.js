const db = require("../config/db");

exports.getAllClients = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute("SELECT * FROM Client");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Ajouter un client
exports.createClient = async (req, res) => {
  try {
    const { id_client, nom, prenom, adresse, telephone } = req.body;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "INSERT INTO Client (id_client, nom, prenom, adresse, telephone) VALUES (:id_client, :nom, :prenom, :adresse, :telephone)",
      { id_client, nom, prenom, adresse, telephone },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Client ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier un client
exports.updateClient = async (req, res) => {
  try {
    const { nom, prenom, adresse, telephone } = req.body;
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "UPDATE Client SET nom=:nom, prenom=:prenom, adresse=:adresse, telephone=:telephone WHERE id_client=:id",
      { nom, prenom, adresse, telephone, id },
      { autoCommit: true }
    );
    res.json({ message: "Client mis à jour avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    await connection.execute(
      "DELETE FROM Client WHERE id_client=:id",
      { id },
      { autoCommit: true }
    );
    res.json({ message: "Client supprimé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVehiculesByClient = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      "SELECT * FROM Vehicule WHERE id_client=:id",
      { id }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
