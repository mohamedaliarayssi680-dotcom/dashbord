const db = require("../config/db");

// ✅ 1. Générer un rapport des réparations effectuées sur une période donnée
exports.getReparationsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      "SELECT * FROM Reparation WHERE date_reparation BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')",
      { startDate, endDate }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 2. Calculer le chiffre d'affaires généré par les réparations
exports.getChiffreAffaires = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      "SELECT SUM(cout) AS total_revenu FROM Reparation"
    );
    res.json({ chiffre_affaires: result.rows[0][0] || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 3. Afficher les véhicules les plus fréquemment réparés
exports.getTopVehiculesRepares = async (req, res) => {
  try {
    const connection = await db.oracledb.getConnection();
    const result = await connection.execute(
      `SELECT id_vehicule, COUNT(*) AS nombre_reparations 
             FROM Reparation 
             GROUP BY id_vehicule 
             ORDER BY nombre_reparations DESC 
             FETCH FIRST 5 ROWS ONLY`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
