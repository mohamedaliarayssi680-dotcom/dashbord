import { useState } from "react";
import Header from "../components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MechanicPage() {
  const [mecaniciens, setMecaniciens] = useState([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Pierre",
      telephone: "123456789",
      adresse: "123 Rue Exemple",
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      telephone: "987654321",
      adresse: "456 Rue Exemple",
    },
  ]);
  const [reparations, setReparations] = useState([
    {
      id: 1,
      description: "Réparation moteur",
      mecanicienId: 1,
      statut: "En cours",
    },
    {
      id: 2,
      description: "Changement pneus",
      mecanicienId: 2,
      statut: "Terminé",
    },
    {
      id: 3,
      description: "Révision générale",
      mecanicienId: 1,
      statut: "En cours",
    },
  ]);
  const [selectedMecanicien, setSelectedMecanicien] = useState(null);
  const [newMecanicien, setNewMecanicien] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleDeleteMecanicien = (id) => {
    setMecaniciens(mecaniciens.filter((mecanicien) => mecanicien.id !== id));
    setReparations(
      reparations.filter((reparation) => reparation.mecanicienId !== id)
    );
  };

  const handleEditMecanicien = (mecanicien) => {
    setNewMecanicien(mecanicien);
    setEditingId(mecanicien.id);
  };

  const handleSelectMecanicien = (id) => {
    setSelectedMecanicien(id);
  };

  const handleAddOrUpdateMecanicien = (e) => {
    e.preventDefault();
    if (editingId) {
      setMecaniciens(
        mecaniciens.map((mecanicien) =>
          mecanicien.id === editingId
            ? { ...newMecanicien, id: editingId }
            : mecanicien
        )
      );
      setEditingId(null);
    } else {
      setMecaniciens([...mecaniciens, { ...newMecanicien, id: Date.now() }]);
    }
    setNewMecanicien({ nom: "", prenom: "", telephone: "", adresse: "" });
  };

  const filteredReparations = selectedMecanicien
    ? reparations.filter(
        (reparation) => reparation.mecanicienId === selectedMecanicien
      )
    : [];

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header
        title={"Mécaniciens"}
        logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-WnSxQOGyzY5zOv91Kd4K9KmzjndtOhhuOZdpUPKovSF2h_DRjsFU9l4hCFproCl8w0&usqp=CAU"
      />
      <div className="p-6 w-full">
        {/* Liste des mécaniciens */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          Liste des Mécaniciens
        </h2>
        <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-2 text-white">Nom</th>
              <th className="border p-2 text-white">Prénom</th>
              <th className="border p-2 text-white">Téléphone</th>
              <th className="border p-2 text-white">Adresse</th>
              <th className="border p-2 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mecaniciens.map((mecanicien) => (
              <tr
                key={mecanicien.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-2">{mecanicien.nom}</td>
                <td className="p-2">{mecanicien.prenom}</td>
                <td className="p-2">{mecanicien.telephone}</td>
                <td className="p-2">{mecanicien.adresse}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => handleSelectMecanicien(mecanicien.id)}
                  >
                    Voir réparations
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => handleEditMecanicien(mecanicien)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteMecanicien(mecanicien.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulaire d'ajout/édition */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          {editingId ? "Modifier un Mécanicien" : "Ajouter un Mécanicien"}
        </h2>
        <form
          className="mt-4 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleAddOrUpdateMecanicien}
        >
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newMecanicien.nom}
            onChange={(e) =>
              setNewMecanicien({ ...newMecanicien, nom: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={newMecanicien.prenom}
            onChange={(e) =>
              setNewMecanicien({ ...newMecanicien, prenom: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={newMecanicien.telephone}
            onChange={(e) =>
              setNewMecanicien({ ...newMecanicien, telephone: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={newMecanicien.adresse}
            onChange={(e) =>
              setNewMecanicien({ ...newMecanicien, adresse: e.target.value })
            }
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Modifier" : "Ajouter"}
          </button>
        </form>

        {/* Affichage des réparations assignées */}
        {selectedMecanicien && (
          <>
            <h2 className="text-2xl font-bold mt-6 text-blue-400">
              Réparations assignées à{" "}
              {
                mecaniciens.find(
                  (mecanicien) => mecanicien.id === selectedMecanicien
                )?.prenom
              }
            </h2>
            <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300 mt-4">
              <thead>
                <tr className="bg-blue-600">
                  <th className="border p-2 text-white">Description</th>
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
                      <td
                        className={`p-2 ${
                          reparation.statut === "Terminé"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } text-white`}
                      >
                        {reparation.statut}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-2 text-center text-gray-400">
                      Aucune réparation assignée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
