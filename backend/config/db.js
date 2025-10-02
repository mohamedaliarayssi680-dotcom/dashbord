const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_HOST,
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("✅ Connexion à Oracle réussie !");
  } catch (err) {
    console.error("❌ Erreur de connexion à Oracle :", err);
  }
}

async function close() {
  try {
    await oracledb.getPool().close();
    console.log("🚀 Connexion fermée !");
  } catch (err) {
    console.error("❌ Erreur de fermeture :", err);
  }
}

module.exports = { initialize, close, oracledb };
