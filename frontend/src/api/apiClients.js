import axios from "axios";

const API_URL = "http://localhost:5000/api/clients"; // URL du backend

// Récupérer tous les clients
export const fetchClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    throw error;
  }
};

// Ajouter un nouveau client
export const addClient = async (client) => {
  try {
    const response = await axios.post(API_URL, client);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du client :", error);
    throw error;
  }
};

// Mettre à jour un client existant
export const updateClient = async (id, client) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, client);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client :", error);
    throw error;
  }
};

// Supprimer un client
export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du client :", error);
    throw error;
  }
};

// Récupérer les véhicules d'un client spécifique
export const fetchVehiclesByClient = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/vehicules`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules :", error);
    throw error;
  }
};
