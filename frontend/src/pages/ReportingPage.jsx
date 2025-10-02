import { useState } from "react";
import Header from "../components/Header";

export default function ReportingPage() {
  // Données de base
  const [reparations, setReparations] = useState([
    {
      id: 1,
      description: "Réparation moteur",
      cout: 500,
      date: "2023-10-01",
      vehiculeId: 1,
    },
    {
      id: 2,
      description: "Changement pneus",
      cout: 200,
      date: "2023-10-05",
      vehiculeId: 2,
    },
    {
      id: 3,
      description: "Révision générale",
      cout: 300,
      date: "2023-10-10",
      vehiculeId: 1,
    },
    {
      id: 4,
      description: "Remplacement freins",
      cout: 400,
      date: "2023-10-15",
      vehiculeId: 3,
    },
  ]);
  const [vehicules, setVehicules] = useState([
    { id: 1, marque: "Peugeot", modele: "208" },
    { id: 2, marque: "Renault", modele: "Clio" },
    { id: 3, marque: "Toyota", modele: "Yaris" },
  ]);

  // États pour la sélection de la période
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filtrer les réparations par période
  const filteredReparations = reparations.filter((reparation) => {
    const reparationDate = new Date(reparation.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && end) {
      return reparationDate >= start && reparationDate <= end;
    }
    return true; // Si aucune période n'est sélectionnée, afficher toutes les réparations
  });

  // Calculer le chiffre d'affaires
  const chiffreAffaires = filteredReparations.reduce(
    (total, reparation) => total + reparation.cout,
    0
  );

  // Compter le nombre de réparations par véhicule
  const vehiculeReparationsCount = vehicules.map((vehicule) => {
    const count = filteredReparations.filter(
      (reparation) => reparation.vehiculeId === vehicule.id
    ).length;
    return { ...vehicule, count };
  });

  // Trier les véhicules par nombre de réparations (du plus fréquent au moins fréquent)
  const mostFrequentVehicules = vehiculeReparationsCount.sort(
    (a, b) => b.count - a.count
  );

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header
        title={"Reporting"}
        logoUrl="https://www.questionpro.com/blog/wp-content/uploads/2022/08/analytics-vs-reporting.jpg"
      />
      <div className="p-6 w-full">
        {/* Titre principal */}
        <h2 className="text-2xl font-bold mb-6 text-white">
          Générer un Rapport
        </h2>

        {/* Sélection de la période */}
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rapport des réparations */}
        <h3 className="text-xl font-bold mb-4 text-white">
          Réparations effectuées
        </h3>
        {filteredReparations.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300 mb-6">
            <thead>
              <tr className="bg-blue-600">
                <th className="border p-2 text-white">Description</th>
                <th className="border p-2 text-white">Coût (€)</th>
                <th className="border p-2 text-white">Date</th>
                <th className="border p-2 text-white">Véhicule</th>
              </tr>
            </thead>
            <tbody>
              {filteredReparations.map((reparation) => (
                <tr
                  key={reparation.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">{reparation.description}</td>
                  <td className="p-2">{reparation.cout} €</td>
                  <td className="p-2">{reparation.date}</td>
                  <td className="p-2">
                    {
                      vehicules.find(
                        (vehicule) => vehicule.id === reparation.vehiculeId
                      )?.marque
                    }{" "}
                    {
                      vehicules.find(
                        (vehicule) => vehicule.id === reparation.vehiculeId
                      )?.modele
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Aucune réparation trouvée.</p>
        )}

        {/* Chiffre d'affaires */}
        <h3 className="text-xl font-bold mb-4 text-white">
          Chiffre d'Affaires
        </h3>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-gray-300 mb-6">
          <p className="text-2xl font-semibold flex items-center">
            Total :{" "}
            <span className="text-blue-500 ml-2">{chiffreAffaires} €</span>
          </p>
        </div>

        {/* Véhicules les plus fréquemment réparés */}
        <h3 className="text-xl font-bold mb-4 text-white">
          Véhicules les plus fréquemment réparés
        </h3>
        {mostFrequentVehicules.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
            <thead>
              <tr className="bg-blue-600">
                <th className="border p-2 text-white">Véhicule</th>
                <th className="border p-2 text-white">Nombre de réparations</th>
              </tr>
            </thead>
            <tbody>
              {mostFrequentVehicules.map((vehicule) => (
                <tr
                  key={vehicule.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">
                    {vehicule.marque} {vehicule.modele}
                  </td>
                  <td className="p-2">{vehicule.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Aucun véhicule trouvé.</p>
        )}
      </div>
    </div>
  );
}
