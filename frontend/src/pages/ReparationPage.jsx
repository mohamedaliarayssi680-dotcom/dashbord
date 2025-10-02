import { useState } from "react";
import Header from "../components/Header";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function ReparationsPage() {
  const [reparations, setReparations] = useState([
    {
      id: 1,
      description: "Réparation moteur",
      cout: 500,
      duree: "2 jours",
      date: "2023-10-01",
      statut: "En cours",
      mecanicienId: 1,
      vehiculeId: 1,
    },
    {
      id: 2,
      description: "Changement pneus",
      cout: 200,
      duree: "1 jour",
      date: "2023-10-05",
      statut: "Terminé",
      mecanicienId: 2,
      vehiculeId: 2,
    },
  ]);

  const [mecaniciens, setMecaniciens] = useState([
    { id: 1, nom: "Pierre Dupont" },
    { id: 2, nom: "Sophie Martin" },
  ]);

  const [vehicules, setVehicules] = useState([
    { id: 1, marque: "Peugeot", modele: "208" },
    { id: 2, marque: "Renault", modele: "Clio" },
  ]);

  const [newReparation, setNewReparation] = useState({
    description: "",
    cout: "",
    duree: "",
    date: "",
    statut: "En cours",
    mecanicienId: "",
    vehiculeId: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedVehicule, setSelectedVehicule] = useState(null);

  const handleDeleteReparation = (id) => {
    setReparations(reparations.filter((reparation) => reparation.id !== id));
  };

  const handleEditReparation = (reparation) => {
    setNewReparation(reparation);
    setEditingId(reparation.id);
  };

  const handleAddOrUpdateReparation = (e) => {
    e.preventDefault();
    if (editingId) {
      setReparations(
        reparations.map((reparation) =>
          reparation.id === editingId
            ? { ...newReparation, id: editingId }
            : reparation
        )
      );
      setEditingId(null);
    } else {
      setReparations([...reparations, { ...newReparation, id: Date.now() }]);
    }
    setNewReparation({
      description: "",
      cout: "",
      duree: "",
      date: "",
      statut: "En cours",
      mecanicienId: "",
      vehiculeId: "",
    });
  };

  const filteredReparations = selectedVehicule
    ? reparations.filter(
        (reparation) => reparation.vehiculeId === selectedVehicule
      )
    : [];

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header
        title={"Réparations"}
        logoUrl="https://cdni.iconscout.com/illustration/premium/thumb/service-de-voiture-ou-entretien-de-voiture-3323962-2809547.png"
      />
      <div className="p-6 w-full">
        {/* Liste des Réparations */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          Liste des Réparations
        </h2>
        <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-2 text-white">Description</th>
              <th className="border p-2 text-white">Coût</th>
              <th className="border p-2 text-white">Durée</th>
              <th className="border p-2 text-white">Date</th>
              <th className="border p-2 text-white">Statut</th>
              <th className="border p-2 text-white">Mécanicien</th>
              <th className="border p-2 text-white">Véhicule</th>
              <th className="border p-2 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reparations.map((reparation) => (
              <tr
                key={reparation.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-2">{reparation.description}</td>
                <td className="p-2">{reparation.cout} €</td>
                <td className="p-2">{reparation.duree}</td>
                <td className="p-2">{reparation.date}</td>
                <td className="p-2">
                  <span
                    className={`${
                      reparation.statut === "En cours"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    } text-white px-2 py-1 rounded`}
                  >
                    {reparation.statut}
                  </span>
                </td>
                <td className="p-2">
                  {
                    mecaniciens.find(
                      (mecanicien) => mecanicien.id === reparation.mecanicienId
                    )?.nom
                  }
                </td>
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
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex items-center"
                    onClick={() => handleEditReparation(reparation)}
                  >
                    <FaEdit className="mr-2" /> Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center"
                    onClick={() => handleDeleteReparation(reparation.id)}
                  >
                    <FaTrash className="mr-2" /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulaire d'ajout/édition */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          {editingId ? "Modifier une Réparation" : "Ajouter une Réparation"}
        </h2>
        <form
          className="mt-4 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleAddOrUpdateReparation}
        >
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newReparation.description}
            onChange={(e) =>
              setNewReparation({
                ...newReparation,
                description: e.target.value,
              })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="cout"
            placeholder="Coût"
            value={newReparation.cout}
            onChange={(e) =>
              setNewReparation({ ...newReparation, cout: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="duree"
            placeholder="Durée"
            value={newReparation.duree}
            onChange={(e) =>
              setNewReparation({ ...newReparation, duree: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="date"
            value={newReparation.date}
            onChange={(e) =>
              setNewReparation({ ...newReparation, date: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="statut"
            value={newReparation.statut}
            onChange={(e) =>
              setNewReparation({ ...newReparation, statut: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
          <select
            name="mecanicienId"
            value={newReparation.mecanicienId}
            onChange={(e) =>
              setNewReparation({
                ...newReparation,
                mecanicienId: e.target.value,
              })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un mécanicien</option>
            {mecaniciens.map((mecanicien) => (
              <option key={mecanicien.id} value={mecanicien.id}>
                {mecanicien.nom}
              </option>
            ))}
          </select>
          <select
            name="vehiculeId"
            value={newReparation.vehiculeId}
            onChange={(e) =>
              setNewReparation({ ...newReparation, vehiculeId: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un véhicule</option>
            {vehicules.map((vehicule) => (
              <option key={vehicule.id} value={vehicule.id}>
                {vehicule.marque} {vehicule.modele}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Modifier" : "Ajouter"}
          </button>
        </form>

        {/* Historique des réparations par véhicule */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          Historique des Réparations par Véhicule
        </h2>
        <select
          value={selectedVehicule || ""}
          onChange={(e) => setSelectedVehicule(Number(e.target.value))}
          className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        >
          <option value="">Sélectionner un véhicule</option>
          {vehicules.map((vehicule) => (
            <option key={vehicule.id} value={vehicule.id}>
              {vehicule.marque} {vehicule.modele}
            </option>
          ))}
        </select>
        {selectedVehicule && (
          <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300 mt-4">
            <thead>
              <tr className="bg-blue-600">
                <th className="border p-2 text-white">Description</th>
                <th className="border p-2 text-white">Coût</th>
                <th className="border p-2 text-white">Date</th>
                <th className="border p-2 text-white">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredReparations.length > 0 ? (
                filteredReparations.map((reparation) => (
                  <tr
                    key={reparation.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-2">{reparation.description}</td>
                    <td className="p-2">{reparation.cout} €</td>
                    <td className="p-2">{reparation.date}</td>
                    <td className="p-2">
                      <span
                        className={`${
                          reparation.statut === "En cours"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        } text-white px-2 py-1 rounded`}
                      >
                        {reparation.statut}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-400">
                    Aucune réparation pour ce véhicule
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
