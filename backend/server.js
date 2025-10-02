const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const vehiculesRoutes = require("./routes/vehicules");
const clientsRoutes = require("./routes/client");
const mecaniciensRoutes = require("./routes/mecaniciens");
const reparationsRoutes = require("./routes/reparations");
const reportingRoutes = require("./routes/reporting");

app.use("/api/vehicules", vehiculesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/mecaniciens", mecaniciensRoutes);
app.use("/api/reparations", reparationsRoutes);
app.use("/api/reporting", reportingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await db.initialize();
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
