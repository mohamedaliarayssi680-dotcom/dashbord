import { useState } from "react";
import Header from "../components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      adresse: "Paris",
      telephone: "0612345678",
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      adresse: "Lyon",
      telephone: "0698765432",
    },
  ]);
  const [vehicles, setVehicles] = useState([
    { id: 1, model: "Toyota", clientId: 1 },
    { id: 2, model: "Honda", clientId: 2 },
  ]);
  const [newClient, setNewClient] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
  });
  const [newVehicle, setNewVehicle] = useState({
    model: "",
    clientId: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    setVehicles(vehicles.filter((vehicle) => vehicle.clientId !== id));
  };

  const handleEditClient = (client) => {
    setNewClient(client);
    setEditingId(client.id);
  };

  const handleChangeClient = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleSubmitClient = (e) => {
    e.preventDefault();
    if (editingId) {
      setClients(
        clients.map((client) =>
          client.id === editingId ? { ...newClient, id: editingId } : client
        )
      );
      setEditingId(null);
    } else {
      setClients([...clients, { ...newClient, id: Date.now() }]);
    }
    setNewClient({ nom: "", prenom: "", adresse: "", telephone: "" });
  };

  const handleSubmitVehicle = (e) => {
    e.preventDefault();
    setVehicles([...vehicles, { ...newVehicle, id: Date.now() }]);
    setNewVehicle({ model: "", clientId: "" });
  };

  const handleChangeVehicle = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header
        title={"Clients"}
        logoUrl="https://media.istockphoto.com/id/1211281744/fr/vectoriel/jeune-homme-heureux-louant-lillustration-de-vecteur-plat-de-voiture.jpg?s=612x612&w=0&k=20&c=lrnZROhiB5kj5q4b6IlhGEgOjGnd0CEEymKIsFek02U="
      />

      <div className="p-6 w-full">
        {/* Liste des clients */}
        <h2 className="text-2xl font-bold mb-6 text-white">
          Liste des Clients
        </h2>
        <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-2 text-white">ID</th>
              <th className="border p-2 text-white">Nom</th>
              <th className="border p-2 text-white">Prénom</th>
              <th className="border p-2 text-white">Adresse</th>
              <th className="border p-2 text-white">Téléphone</th>
              <th className="border p-2 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-2">{client.id}</td>
                <td className="p-2">{client.nom}</td>
                <td className="p-2">{client.prenom}</td>
                <td className="p-2">{client.adresse}</td>
                <td className="p-2">{client.telephone}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleEditClient(client)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulaire pour ajouter/modifier un client */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          {editingId ? "Modifier un client" : "Ajouter un client"}
        </h2>
        <form
          className="mt-4 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmitClient}
        >
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newClient.nom}
            onChange={handleChangeClient}
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={newClient.prenom}
            onChange={handleChangeClient}
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={newClient.adresse}
            onChange={handleChangeClient}
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={newClient.telephone}
            onChange={handleChangeClient}
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

        {/* Associer un véhicule à un client */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          Associer un véhicule à un client
        </h2>
        <form
          className="mt-4 space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmitVehicle}
        >
          <input
            type="text"
            name="model"
            placeholder="Modèle du véhicule"
            value={newVehicle.model}
            onChange={handleChangeVehicle}
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="clientId"
            value={newVehicle.clientId}
            onChange={handleChangeVehicle}
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
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Ajouter un véhicule
          </button>
        </form>

        {/* Liste des véhicules associés */}
        <h2 className="text-2xl font-bold mt-6 text-white">
          Véhicules associés
        </h2>
        <table className="w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="border p-2 text-white">Modèle</th>
              <th className="border p-2 text-white">Client</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => {
              const client = clients.find(
                (client) => client.id === vehicle.clientId
              );
              return (
                <tr
                  key={vehicle.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">{vehicle.model}</td>
                  <td className="p-2">
                    {client
                      ? `${client.nom} ${client.prenom}`
                      : "Client introuvable"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
