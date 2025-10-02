import { useState } from "react";
import Header from "../components/Header";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function VehiclesPage() {
  const [vehicules, setVehicules] = useState([
    {
      id: 1,
      marque: "Peugeot",
      modele: "208",
      immatriculation: "ABC123",
      annee: 2020,
      statut: "Actif",
      clientId: 1,
    },
    {
      id: 2,
      marque: "Renault",
      modele: "Clio",
      immatriculation: "XYZ456",
      annee: 2021,
      statut: "Inactif",
      clientId: 2,
    },
  ]);
  const [clients, setClients] = useState([
    { id: 1, nom: "Dupont", prenom: "Pierre" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
  ]);
  const [newVehicle, setNewVehicle] = useState({
    marque: "",
    modele: "",
    immatriculation: "",
    annee: "",
    statut: "Actif",
    clientId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleDeleteVehicle = (id) => {
    setVehicules(vehicules.filter((vehicle) => vehicle.id !== id));
  };

  const handleEditVehicle = (vehicle) => {
    setNewVehicle(vehicle);
    setEditingId(vehicle.id);
  };

  const handleSelectVehicle = (id) => {
    setSelectedVehicle(id);
  };

  const handleAddOrUpdateVehicle = (e) => {
    e.preventDefault();
    if (editingId) {
      setVehicules(
        vehicules.map((vehicle) =>
          vehicle.id === editingId ? { ...newVehicle, id: editingId } : vehicle
        )
      );
      setEditingId(null);
    } else {
      setVehicules([...vehicules, { ...newVehicle, id: Date.now() }]);
    }
    setNewVehicle({
      marque: "",
      modele: "",
      immatriculation: "",
      annee: "",
      statut: "Actif",
      clientId: "",
    });
  };

  const filteredVehicles = selectedVehicle
    ? vehicules.filter((vehicle) => vehicle.id === selectedVehicle)
    : [];

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header
        title={"Véhicules"}
        logoUrl="https://previews.123rf.com/images/doomko/doomko1609/doomko160900004/64557628-car-garage-symbol-cartoon-on-white-background.jpg"
      />
      <div className="p-6 w-full">
        {/* Liste des véhicules */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          Liste des Véhicules
        </h2>
        <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-2 text-white">Marque</th>
              <th className="border p-2 text-white">Modèle</th>
              <th className="border p-2 text-white">Immatriculation</th>
              <th className="border p-2 text-white">Année</th>
              <th className="border p-2 text-white">Statut</th>
              <th className="border p-2 text-white">Client</th>
              <th className="border p-2 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicules.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-2">{vehicle.marque}</td>
                <td className="p-2">{vehicle.modele}</td>
                <td className="p-2">{vehicle.immatriculation}</td>
                <td className="p-2">{vehicle.annee}</td>
                <td
                  className={`p-2 ${
                    vehicle.statut === "Actif" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {vehicle.statut}
                </td>
                <td className="p-2">
                  {
                    clients.find((client) => client.id === vehicle.clientId)
                      ?.nom
                  }
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex items-center"
                    onClick={() => handleSelectVehicle(vehicle.id)}
                  >
                    <FaEye className="mr-2" /> Voir
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex items-center"
                    onClick={() => handleEditVehicle(vehicle)}
                  >
                    <FaEdit className="mr-2" /> Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
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
          {editingId ? "Modifier un Véhicule" : "Ajouter un Véhicule"}
        </h2>
        <form
          className="mt-4 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleAddOrUpdateVehicle}
        >
          <input
            type="text"
            name="marque"
            placeholder="Marque"
            value={newVehicle.marque}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, marque: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="modele"
            placeholder="Modèle"
            value={newVehicle.modele}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, modele: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="immatriculation"
            placeholder="Immatriculation"
            value={newVehicle.immatriculation}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, immatriculation: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="annee"
            placeholder="Année"
            value={newVehicle.annee}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, annee: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="statut"
            value={newVehicle.statut}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, statut: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
          <select
            name="clientId"
            value={newVehicle.clientId}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, clientId: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom} {client.prenom}
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

        {/* Affichage des détails du véhicule */}
        {selectedVehicle && (
          <>
            <h2 className="text-2xl font-bold mt-6 text-white">
              Détails du Véhicule
            </h2>
            <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300 mt-4">
              <thead>
                <tr className="bg-blue-600">
                  <th className="border p-2 text-white">Marque</th>
                  <th className="border p-2 text-white">Modèle</th>
                  <th className="border p-2 text-white">Immatriculation</th>
                  <th className="border p-2 text-white">Année</th>
                  <th className="border p-2 text-white">Statut</th>
                  <th className="border p-2 text-white">Client</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-2">{vehicle.marque}</td>
                    <td className="p-2">{vehicle.modele}</td>
                    <td className="p-2">{vehicle.immatriculation}</td>
                    <td className="p-2">{vehicle.annee}</td>
                    <td
                      className={`p-2 ${
                        vehicle.statut === "Actif"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {vehicle.statut}
                    </td>
                    <td className="p-2">
                      {
                        clients.find((client) => client.id === vehicle.clientId)
                          ?.nom
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
