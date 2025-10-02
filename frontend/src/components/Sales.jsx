import { motion } from "framer-motion";
import image2 from "../assets/image2.jpg"; // Chemin correct

const Sales = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Sales Overview</h2>

      {/* Affichage de l'image */}
      <div className="h-80 flex items-center justify-center">
        <img
          src={image2} // Image correctement importée
          alt="Sales Overview"
          className="rounded-lg object-cover w-[90%] h-[300px]" // Utilisation de Tailwind pour le style
        />
      </div>
    </motion.div>
  );
};

export default Sales;
